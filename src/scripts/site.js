const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
let prefersReducedMotion = reducedMotionQuery.matches
const isDevelopment = import.meta.env.DEV

const bindMediaQueryChange = (query, handler) => {
  if ("addEventListener" in query) {
    query.addEventListener("change", handler)
    return () => query.removeEventListener("change", handler)
  }

  query.addListener(handler)
  return () => query.removeListener(handler)
}

const syncReducedMotionPreference = (event) => {
  prefersReducedMotion = event.matches
}

const releaseReducedMotionListener = bindMediaQueryChange(reducedMotionQuery, syncReducedMotionPreference)

const warnCollage = (message, context) => {
  if (!isDevelopment) return
  console.warn("[ExperienceCollage]", message, context)
}

const initRevealItems = () => {
  const revealItems = Array.from(document.querySelectorAll("[data-reveal]"))

  if (prefersReducedMotion) {
    revealItems.forEach((item) => item.classList.add("is-visible"))
    return
  }

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"))
    return
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add("is-visible")
        revealObserver.unobserve(entry.target)
      })
    },
    { threshold: 0.12 }
  )

  revealItems.forEach((item) => revealObserver.observe(item))
}

const initAutoplayVideos = () => {
  const autoplayVideos = Array.from(document.querySelectorAll("[data-autoplay-video]"))

  const playVideo = (video) => {
    video.muted = true
    video.defaultMuted = true
    video.playsInline = true
    video.setAttribute("muted", "")
    video.setAttribute("playsinline", "")

    const attempt = video.play()
    if (attempt && typeof attempt.catch === "function") {
      attempt.catch(() => {})
    }
  }

  autoplayVideos.forEach((video) => {
    playVideo(video)

    const replay = () => {
      playVideo(video)
    }

    video.addEventListener("loadeddata", replay)
    video.addEventListener("canplay", replay)
    video.addEventListener("mouseenter", replay)

    if (video.readyState === 0) {
      video.load()
    }
  })

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) return
    autoplayVideos.forEach(playVideo)
  })
}

const initFilters = () => {
  const filterRoots = Array.from(document.querySelectorAll("[data-filter-root]"))

  filterRoots.forEach((root) => {
    const items = Array.from(root.querySelectorAll("[data-filter-item]"))
    const buttons = Array.from(root.querySelectorAll("[data-filter-button]"))
    const emptyState = root.querySelector("[data-filter-empty]")
    const groups = [...new Set(buttons.map((button) => button.dataset.filterName).filter(Boolean))]
    const state = Object.fromEntries(groups.map((name) => [name, "all"]))

    const update = () => {
      let visibleCount = 0

      items.forEach((item) => {
        const matches = Object.entries(state).every(([name, value]) => value === "all" || item.dataset[name] === value)
        item.hidden = !matches
        if (matches) visibleCount += 1
      })

      buttons.forEach((button) => {
        const isActive = state[button.dataset.filterName] === button.dataset.filterValue
        button.classList.toggle("is-active", isActive)
        button.setAttribute("aria-pressed", isActive ? "true" : "false")
      })

      if (emptyState) {
        emptyState.hidden = visibleCount > 0
      }
    }

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        state[button.dataset.filterName] = button.dataset.filterValue
        update()
      })
    })

    update()
  })
}

const initCollages = () => {
  const collageLoops = Array.from(document.querySelectorAll("[data-collage-loop]"))

  collageLoops.forEach((scroller) => {
    const root = scroller.closest("[data-collage-root]")
    if (!root) {
      warnCollage("Skipping collage initialization because the root is missing.", scroller)
      return
    }

    const previousButton = root.querySelector("[data-collage-prev]")
    const nextButton = root.querySelector("[data-collage-next]")
    const sequences = Array.from(scroller.querySelectorAll("[data-collage-sequence]"))

    if (!previousButton || !nextButton) {
      warnCollage("Collage controls are missing expected arrow buttons.", root)
    }

    if (sequences.length < 3) {
      warnCollage("Skipping collage initialization because fewer than three loop sequences were found.", {
        root,
        sequenceCount: sequences.length
      })
      return
    }

    const panelsBySequence = sequences.map((sequence) => Array.from(sequence.querySelectorAll("[data-collage-panel]")))
    const allPanels = panelsBySequence.flat()

    if (allPanels.length === 0) {
      warnCollage("Skipping collage initialization because no panels were found.", root)
      return
    }

    let sequenceWidth = 0
    let isPointerDown = false
    let isProgrammaticScroll = false
    let pointerId = null
    let startX = 0
    let startScrollLeft = 0
    let hoverDirection = 0
    let hoverProgress = 0
    let currentVelocity = 0
    let pauseUntil = 0
    let rafId = null
    let smoothScrollId = null
    let lastFrame = performance.now()

    const AUTO_DRIFT_SPEED = 0.024
    const HOVER_PULL_SPEED = 0.24
    const HOVER_PULL_ENTRY = 240
    const HOVER_PULL_RELEASE = 560
    const HOVER_ACCELERATION = 220
    const HOVER_SETTLE = 360
    const COAST_TO_STOP = 460

    const measureSequenceWidth = () => sequences[0]?.offsetWidth || sequences[0]?.scrollWidth || 0

    const markInteraction = (ms = 2800) => {
      pauseUntil = performance.now() + ms
    }

    const approachValue = (current, target, delta, timeConstant) =>
      current + (target - current) * (1 - Math.exp(-delta / timeConstant))

    const applyPullVisuals = (pullAmount = 0) => {
      const strength = Math.min(1, Math.abs(pullAmount))
      const direction = pullAmount < -0.015 ? -1 : pullAmount > 0.015 ? 1 : 0

      root.style.setProperty("--collage-pull-strength", strength.toFixed(3))
      root.style.setProperty("--collage-pull-shift", `${(pullAmount * 18).toFixed(2)}px`)

      previousButton?.classList.toggle("is-pulling", direction < 0)
      nextButton?.classList.toggle("is-pulling", direction > 0)
    }

    const setFreeScrolling = (enabled) => {
      scroller.classList.toggle("is-free-scrolling", enabled)
    }

    const syncLoopPosition = () => {
      sequenceWidth = measureSequenceWidth()
      if (!sequenceWidth) return

      if (scroller.scrollLeft < sequenceWidth * 0.5) {
        scroller.scrollLeft += sequenceWidth
      } else if (scroller.scrollLeft > sequenceWidth * 1.5) {
        scroller.scrollLeft -= sequenceWidth
      }
    }

    const stopProgrammaticScroll = ({ sync = false } = {}) => {
      if (smoothScrollId !== null) {
        window.cancelAnimationFrame(smoothScrollId)
        smoothScrollId = null
      }

      isProgrammaticScroll = false

      if (sync) {
        syncLoopPosition()
      }
    }

    const getLiveHoverDirection = () => {
      if (prefersReducedMotion) return 0

      const previousHovered = previousButton?.matches(":hover") ?? false
      const nextHovered = nextButton?.matches(":hover") ?? false

      if (previousHovered === nextHovered) return 0
      return nextHovered ? 1 : -1
    }

    const syncHoverDirection = () => {
      const liveDirection = getLiveHoverDirection()
      if (liveDirection === hoverDirection) return

      if (liveDirection !== 0 && hoverDirection !== 0 && liveDirection !== hoverDirection) {
        hoverProgress = 0
      }

      if (liveDirection !== 0 && Math.sign(currentVelocity) !== 0 && Math.sign(currentVelocity) !== liveDirection) {
        currentVelocity = 0
      }

      hoverDirection = liveDirection

      if (hoverDirection !== 0) {
        if (!isProgrammaticScroll) {
          stopProgrammaticScroll({ sync: true })
        }
        markInteraction(3200)
        return
      }

      markInteraction(2000)
    }

    const tick = (time) => {
      const delta = Math.min(time - lastFrame, 48)
      lastFrame = time

      syncHoverDirection()

      hoverProgress = approachValue(
        hoverProgress,
        hoverDirection,
        delta,
        hoverDirection !== 0 ? HOVER_PULL_ENTRY : HOVER_PULL_RELEASE
      )
      applyPullVisuals(hoverProgress)

      const canAnimate =
        !prefersReducedMotion &&
        !isPointerDown &&
        !isProgrammaticScroll &&
        (!document.hidden || hoverDirection !== 0 || Math.abs(hoverProgress) > 0.002 || Math.abs(currentVelocity) > 0.001)

      if (canAnimate) {
        let targetVelocity = 0
        const hasHoverPull = Math.abs(hoverProgress) > 0.002

        if (hasHoverPull) {
          targetVelocity = hoverProgress * HOVER_PULL_SPEED
        } else if (!scroller.matches(":hover") && time >= pauseUntil) {
          targetVelocity = AUTO_DRIFT_SPEED
        }

        const easingTime =
          targetVelocity === 0
            ? COAST_TO_STOP
            : Math.abs(targetVelocity) > Math.abs(currentVelocity) + 0.002
              ? HOVER_ACCELERATION
              : HOVER_SETTLE

        setFreeScrolling(hasHoverPull || targetVelocity !== 0 || Math.abs(currentVelocity) > 0.001)
        currentVelocity = approachValue(currentVelocity, targetVelocity, delta, easingTime)

        if (Math.abs(currentVelocity) < 0.001 && Math.abs(targetVelocity) < 0.001) {
          currentVelocity = 0
        }

        if (currentVelocity !== 0) {
          scroller.scrollLeft += delta * currentVelocity
          syncLoopPosition()
        }
      } else {
        setFreeScrolling(isPointerDown || isProgrammaticScroll)
        currentVelocity = 0
      }

      rafId = window.requestAnimationFrame(tick)
    }

    const getPanelCenter = (panel) => {
      const scrollerRect = scroller.getBoundingClientRect()
      const panelRect = panel.getBoundingClientRect()
      return panelRect.left - scrollerRect.left + scroller.scrollLeft + panelRect.width / 2
    }

    const getPanelTargetScrollLeft = (panel) => getPanelCenter(panel) - scroller.clientWidth / 2

    const getScrollerCenter = () => scroller.scrollLeft + scroller.clientWidth / 2

    const getAdjacentPanel = (direction) => {
      const scrollerCenter = getScrollerCenter()
      const threshold = 12
      let candidate = null
      let candidateDistance = Number.POSITIVE_INFINITY

      allPanels.forEach((panel) => {
        const distance = getPanelCenter(panel) - scrollerCenter
        const isInDirection = direction > 0 ? distance > threshold : distance < -threshold
        if (!isInDirection) return

        const absoluteDistance = Math.abs(distance)
        if (absoluteDistance < candidateDistance) {
          candidate = panel
          candidateDistance = absoluteDistance
        }
      })

      return candidate
    }

    const getNearestPanel = () => {
      const scrollerCenter = getScrollerCenter()
      let nearestPanel = allPanels[0]
      let nearestDistance = Number.POSITIVE_INFINITY

      allPanels.forEach((panel) => {
        const distance = Math.abs(getPanelCenter(panel) - scrollerCenter)
        if (distance < nearestDistance) {
          nearestDistance = distance
          nearestPanel = panel
        }
      })

      return nearestPanel
    }

    const animateScrollTo = (targetScrollLeft) => {
      stopProgrammaticScroll()
      markInteraction(4200)

      if (prefersReducedMotion) {
        scroller.scrollLeft = targetScrollLeft
        syncLoopPosition()
        return
      }

      const startScroll = scroller.scrollLeft
      const distance = targetScrollLeft - startScroll

      if (Math.abs(distance) < 2) {
        scroller.scrollLeft = targetScrollLeft
        syncLoopPosition()
        return
      }

      const duration = Math.min(920, Math.max(520, Math.abs(distance) * 0.62))
      const startTime = performance.now()
      isProgrammaticScroll = true
      setFreeScrolling(true)

      const ease = (progress) =>
        progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2

      const frame = (frameTime) => {
        const progress = Math.min((frameTime - startTime) / duration, 1)
        scroller.scrollLeft = startScroll + distance * ease(progress)

        if (progress < 1) {
          smoothScrollId = window.requestAnimationFrame(frame)
          return
        }

        scroller.scrollLeft = targetScrollLeft
        stopProgrammaticScroll()
        setFreeScrolling(false)
        syncLoopPosition()
      }

      smoothScrollId = window.requestAnimationFrame(frame)
    }

    const stepCollage = (direction) => {
      stopProgrammaticScroll()
      currentVelocity = 0

      let targetPanel = getAdjacentPanel(direction)
      if (!targetPanel) {
        syncLoopPosition()
        targetPanel = getAdjacentPanel(direction) ?? getNearestPanel()
      }

      if (!targetPanel) return
      animateScrollTo(getPanelTargetScrollLeft(targetPanel))
    }

    const startDragging = (event) => {
      if (event.pointerType === "touch") return

      stopProgrammaticScroll({ sync: true })
      isPointerDown = true
      pointerId = event.pointerId
      startX = event.clientX
      startScrollLeft = scroller.scrollLeft
      markInteraction(4200)
      setFreeScrolling(true)
      scroller.classList.add("is-dragging")
      scroller.setPointerCapture(pointerId)
    }

    const stopDragging = () => {
      if (!isPointerDown) return

      isPointerDown = false
      scroller.classList.remove("is-dragging")

      if (pointerId !== null && scroller.hasPointerCapture(pointerId)) {
        scroller.releasePointerCapture(pointerId)
      }

      pointerId = null
      setFreeScrolling(false)
      syncLoopPosition()
    }

    const onPointerMove = (event) => {
      if (!isPointerDown) return

      const deltaX = event.clientX - startX
      scroller.scrollLeft = startScrollLeft - deltaX
      syncLoopPosition()
    }

    const onWheel = (event) => {
      stopProgrammaticScroll({ sync: true })

      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
      if (Math.abs(delta) < 2) return

      event.preventDefault()
      scroller.scrollLeft += delta
      markInteraction(2400)
      syncLoopPosition()
    }

    const onKeydown = (event) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return

      event.preventDefault()
      stepCollage(event.key === "ArrowRight" ? 1 : -1)
    }

    const onScroll = () => {
      if (isProgrammaticScroll) return
      syncLoopPosition()
    }

    const updateSequenceMetrics = ({ recenter = false } = {}) => {
      const measuredWidth = measureSequenceWidth()
      if (!measuredWidth) {
        warnCollage("Collage sequence width was zero during measurement.", root)
        return false
      }

      sequenceWidth = measuredWidth

      if (recenter || scroller.scrollLeft < sequenceWidth * 0.25) {
        scroller.scrollLeft = sequenceWidth
      }

      syncLoopPosition()
      return true
    }

    let disconnectResize = () => {}

    if ("ResizeObserver" in window) {
      const resizeObserver = new ResizeObserver(() => {
        updateSequenceMetrics()
      })

      resizeObserver.observe(sequences[0])
      disconnectResize = () => resizeObserver.disconnect()
    } else {
      warnCollage("ResizeObserver is unavailable, falling back to window resize events.", root)

      const handleResize = () => {
        updateSequenceMetrics()
      }

      window.addEventListener("resize", handleResize)
      disconnectResize = () => window.removeEventListener("resize", handleResize)
    }

    if (!updateSequenceMetrics({ recenter: true })) {
      window.requestAnimationFrame(() => {
        updateSequenceMetrics({ recenter: true })
      })
    }

    rafId = window.requestAnimationFrame(tick)

    scroller.addEventListener("pointerdown", startDragging)
    scroller.addEventListener("pointermove", onPointerMove)
    scroller.addEventListener("pointerup", stopDragging)
    scroller.addEventListener("pointercancel", stopDragging)
    scroller.addEventListener("pointerleave", stopDragging)
    scroller.addEventListener("wheel", onWheel, { passive: false })
    scroller.addEventListener("keydown", onKeydown)
    scroller.addEventListener("scroll", onScroll, { passive: true })
    previousButton?.addEventListener("click", () => {
      stepCollage(-1)
    })
    nextButton?.addEventListener("click", () => {
      stepCollage(1)
    })

    const cleanup = () => {
      disconnectResize()
      applyPullVisuals(0)
      stopProgrammaticScroll()

      if (rafId !== null) {
        window.cancelAnimationFrame(rafId)
      }
    }

    window.addEventListener("beforeunload", cleanup, { once: true })
  })
}

const initSite = () => {
  initRevealItems()
  initAutoplayVideos()
  initFilters()
  initCollages()
}

initSite()

window.addEventListener(
  "pagehide",
  () => {
    releaseReducedMotionListener()
  },
  { once: true }
)
