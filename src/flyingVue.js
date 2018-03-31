import './style/vuelogo.styl'
import vuelogo from './assets/vuelogo.svg'

import { TimelineLite } from 'gsap'

const winSize = () => {
  return { w: window.innerWidth, h: window.innerHeight }
}

export default {
  data () {
    return {
      kek: 0
    }
  },
  mounted () {
    const t = new TimelineLite()

    t.to('.vue-flying-logo img', 4, {x: winSize().w - 126, repeat: -1, yoyo: true, ease: 'Linear.easeNone'})
      .to('.vue-flying-logo img', 6, {y: winSize().h - 106, repeat: -1, yoyo: true, ease: 'Linear.easeNone'}, 0)
  },
  render (h) {
    return h('div', {
      class: {
        'vue-flying-logo': true
      }
    }, [
      h('img', {
        attrs: {
          src: vuelogo
        }
      })
    ])
  }
}
