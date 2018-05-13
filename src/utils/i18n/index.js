/**
 * Created by ZhouTing on 2018-05-13 17:32.
 */
import I18n from 'react-native-i18n';
import en from './en';
import zh from './zh';

I18n.fallbacks = true;

I18n.translations = {
    en,
    zh
};

export default I18n;