import { Reading, ReadingPlan } from "../types";


const checksum = (s: string): string => {
  var chk = 0x12345678;
  var len = s.length;
  for (var i = 0; i < len; i++) {
      chk += (s.charCodeAt(i) * (i + 1));
  }

  return (chk & 0xffffffff).toString(16);
}

export const getDefaultPlans = (): ReadingPlan[] => {
    const data = ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi', 'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation', 'Tobit', 'Judith', 'Additions to Esther', 'Wisdom of Solomon', 'Sirach', 'Baruch', 'Epistle of Jeremiah', 'Prayer of Azariah & Song of the Three Jews', 'Susanna', 'Bel and the Dragon', '1 Maccabees', '2 Maccabees', '1 Esdras', 'Prayer of Manasseh', '3 Maccabees', '2 Esdras', '4 Maccabees'];
    const name = "Bible + Apocrypha";
    const sum = checksum(name);
    const readings: Reading[] = [];

    for (let i = 0; i < data.length; i++) {
        const r: Reading= {
            key: `${sum}-${i}`,
            text: data[i],
            checked: false
        }
        readings.push(r);
    }

    return [
        {
            name: name,
            readings: readings,
        }
    ]
}