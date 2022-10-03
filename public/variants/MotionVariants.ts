export const shapesContainerVariant: any = {
  hidden: {
    scale: 0.9,
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
}

export const fadeInContainer = {
  initial: {
    y: -100,
  },
  animate: {
    y: 0,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.7,
    },
  },
}

export const projectsContainer = {
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
}

export const fadeTop = {
  hidden: {
    scale: 0,
    y: '-100%',
  },
  visible: {
    scale: 1,
    y: 0,
  },
}

export const fadeInLeft = {
  initial: {
    scale: 0,
    x: '-100%',
  },
  animate: {
    scale: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export const fadeInRightText = {
  initial: {
    scale: 0,
    x: '200%',
  },
  animate: {
    scale: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export const fadeInRightIcons = {
  initial: {
    scale: 0,
    x: '200%',
  },
  animate: {
    scale: 1,
    x: 0,
    transition: {
      duration: 0.2,
    },
  },
}
