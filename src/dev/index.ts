import DirectionalNavigation from '../lib'

window.addEventListener('DOMContentLoaded', DirectionalNavigation.init)

window.addEventListener('dn:did-focus', e => {
  console.log('[directional-navigation]: did focus:', e.target)

  const $el = e.target as HTMLElement

  $el.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'center',
  })
})
