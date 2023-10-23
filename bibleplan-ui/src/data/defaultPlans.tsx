import { PlanBrief, PlanBriefs, Reading, ReadingPlan } from "../types";


const checksum = (s: string): string => {
  var chk = 0x12345678;
  var len = s.length;
  for (var i = 0; i < len; i++) {
      chk += (s.charCodeAt(i) * (i + 1));
  }

  return (chk & 0xffffffff).toString(16);
}

export const getDefaultPlans = (): PlanBrief[] => {
    const plans: PlanBrief[] = [
        {
            key: '1',
            name: "Bible in a Year",
            desc: "Read the Bible in a year!",
            tags: ["Old Testament", "New Testament"]
        },
        {
            key: '2',
            name: "30 Days of John",
            desc: "All the Johanine books in a month. Check out the intertextuality!",
            tags: ["New Testament"]
        },
        {
            key: '3',
            name: "New Testament in 90 Days",
            desc: "Read the New Testament in 90 days. Go through this with a small group Bible study for some serious spiritual growth.",
            tags: ["New Testament"]
        },
        {
            key: '4',
            name: "Bible by Genre",
            desc: "A neat way of reading the Bible that reads a different genre every day of the week: Gospels, Law, History, Psalms, Poetry, Prophecy, and Epistles.",
            tags: ["Old Testament, New Testament"]
        },
        {
            key: '5',
            name: "Old and New",
            desc: "A little bit of both Old and New Testament every day.",
            tags: ["Old Testament", "New Testament"]
        },
        {
            key: '6',
            name: "Septuagint",
            desc: "A 1 year reading plan that goes through the Bible and the Apocrypha. Books are ordered according to the Septuagint. Watch out for Daniel and Esther, they have some extra sections.",
            tags: ["Old Testament", "New Testament", "Apocrypha"]
        },
        {
            key: '7',
            name: "Spicey",
            desc: "A 1 year reading plan covering the Bible, Apocrypha, and Old Testament Pseudepigrapha.",
            tags: ["Old Testament", "New Testament", "Apocrypha", "Old Testament Pseudepigrapha"]
        }
    ]

    return plans
}

export const getDefaultPlans2 = (): ReadingPlan[] => {
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