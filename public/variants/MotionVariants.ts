export const shapesContainerVariant: any = (reduce: boolean) => ({
  hidden: {
    scale: reduce ? 1 : 0.9,
    opacity: 0.1,
  },
  visible: {
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.5,
      duration: 1.2,
      when: 'afterChildren',
      repeat: Infinity,
      repeatType: 'reverse',
      type: 'tween',
    },
  },
})

export const fadeInContainer = (reduce: boolean) => ({
  initial: {
    y: -100,
    opacity: reduce ? 0 : 1,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: reduce ? 0.3 : 0.5,
    },
  },
})

export const projectsContainer = (reduce: boolean) => ({
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.2,
    },
  },
})

export const fadeTop = (reduce: boolean) => ({
  hidden: {
    scale: 0,
    y: '-100%',
    opacity: reduce ? 0 : 1,
  },
  visible: {
    scale: 1,
    y: 0,
    opacity: 1,
    transition: {
      duration: reduce ? 0.3 : 0.5,
    },
  },
})

export const fadeInLeft = (reduce: boolean) => ({
  initial: {
    scale: 0,
    x: '-70%',
    opacity: reduce ? 0 : 1,
  },
  animate: {
    scale: 1,
    x: 0,
    opacity: 1,
    transition: {
      duration: reduce ? 0.2 : 0.5,
    },
  },
})

export const fadeInRightText = (reduce: boolean) => ({
  initial: {
    scale: 0,
    x: '50%',
    opacity: reduce ? 0 : 1,
  },
  animate: {
    scale: 1,
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
})

export const fadeInRightIcons = (reduce: boolean) => ({
  initial: {
    scale: 0,
    x: '50%',
    opacity: reduce ? 0 : 1,
  },
  animate: {
    scale: 1,
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
})

export const cardVariant = (reduce: boolean) => ({
  initial: {
    scale: 0,
    x: '100%',
  },
  animate: {
    scale: 1,
    x: 0,
    transition: {
      duration: 0.7,
      type: 'spring',
    },
  },
  hover: {
    scale: reduce ? 1 : 1.1,
  },
})

export const sectionVariant = (reduce: boolean) => ({
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: reduce ? 0.1 : 0,
    },
  },
})
