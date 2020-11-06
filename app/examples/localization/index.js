const trans = ({ en, fr }) => {
  return function () {
    const { lang } = this.context
    if (lang === 'fr') return fr
    return en
  }
}

const changeLanguage = {
  tag: 'input',
  props: {
    type: 'button',
    value: trans({ en: 'Change language', fr: 'Changer la langue' })
  },
  events: {
    click: function () {
      const { lang } = this.context
      if (lang === 'en') this.context.lang = 'fr'
      else this.context.lang = 'en'
      this.parent.update()
    }
  }
}

const title = {
  tag: 'h1',
  render: trans({ en: 'This is the home page', fr: 'Ceci est la page acceuil' })
}

const description = {
  tag: 'div',
  render: trans({ 
    en: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Imperdiet massa tincidunt nunc pulvinar. Et netus et malesuada fames ac. Mauris vitae ultricies leo integer malesuada nunc vel. Nisl vel pretium lectus quam id leo in vitae.',
    fr: 'Praesent elementum facilisis leo vel fringilla. Integer feugiat scelerisque varius morbi enim nunc faucibus. Sagittis id consectetur purus ut faucibus pulvinar. Nullam non nisi est sit. Sed blandit libero volutpat sed cras ornare arcu. Malesuada bibendum arcu vitae elementum curabitur.'
  })
}

const page = {
  tag: 'div',
  children: [title, description]
}

const app = {
  tag: 'div',
  context: { lang: 'en' },
  children: [changeLanguage, page]
}

export default app