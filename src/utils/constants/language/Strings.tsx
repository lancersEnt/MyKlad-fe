import fr from './FR/Frensh';
import en from './EN/English';

export default function Strings(language: string) {
  switch (language) {
    case 'frensh':
      return fr;
    case 'english':
      return en;
    default:
      return fr;
  }
}
