import i18n from "i18next"
import { initReactI18next, useTranslation } from "react-i18next"
import es from "../../locale/es.json"

const Language = {
  SPAIN: 'es',
}
const lng = Language.SPAIN
const config = {
  debug: true,
  initImmediate: false,
  preload: [lng],
  lng: lng,
  resources: {
    es: { translation: es }
  }
}
const useI18n = () => {
  const { t } = useTranslation()
  return {
    t,
    tt: i18nArr => i18nArr.map(key => t(key)),
    tm: i18nObj => {
      const result = Object.assign({}, i18nObj)
      Object.keys(result).forEach(key => {
        result[key] = t(i18nObj[key])
      })
      return result
    }
  }
}

export const initI18n = () => {
  i18n
    .use(initReactI18next)
    .init(config)
}
export default useI18n