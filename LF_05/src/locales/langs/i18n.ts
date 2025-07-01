import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
// 按需导入语言文件
import zhCn from "./zh-cn.json";
import enUs from "./en-us.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false, // 生产环境关闭debug
    fallbackLng: "zh", // 默认使用中文
    interpolation: {
      escapeValue: false,
    },
    // 减少初始化时的不必要处理
    load: 'languageOnly', // 只加载语言代码，不加载区域设置
    ns: ['translation'], // 只使用默认命名空间
    defaultNS: 'translation',
    resources: {
      en: {
        translation: enUs,
      },
      zh: {
        translation: zhCn,
      },
    },
  });

export default i18n;
