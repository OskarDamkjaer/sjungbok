const fs = require("fs");
const songs = require("./static/songs.json");
const real = [
  "Rosa på bal",
  "Måltidssång (Fredmans sång nr 21)",
  "Fyllevisa",
  "Köttet kommer",
  "Spritbolaget",
  "Lackalänga",
  "Skotten",
  "Härjarevisan",
  "Jag har aldrig varit på snusen",
  "Vikingen",
  "Mobiltelefonen",
  "På golvet",
  "Det naturliga urvalet",
  "Bakfyllosofen",
  "Jag har aldrig varit i frysen",
  "Dessertvisa",
  "Jag vill ut och gasqua",
  "Jag har aldrig varit på UB",
  "Kissemiss",
  "Lyft ditt välförsedda glas",
  "Jag ska festa",
  "Törsten rasar",
  "Treo-comp",
  "Stopp en stund",
  "När jag kissar överallt",
  "Gamla vänner",
  "Efter alkohol",
  "För en lyckad kväll",
  "Dunderdrickan",
  "Hundmat",
  "Ode till Aq-va-kul",
  "Vit vecka",
  "Uti min mage",
  "Jesus lever",
  "Spela Skyrim",
  "Baklängesfyllan",
  "Tenta efter jul",
  "O gamla klang och jubeltid",
  "1, 2, 75, 6, 7",
  "Mera brännvin",
  "75:an",
  "Änglahund",
  "Armen i vinkel",
  "Att fela är mänskligt",
  "Dricka långsamt",
  "Dansk snapsvisa",
  "Finsk snapsvisa",
  "En gång i månan",
  "Imsig vimsig",
  "Uddevalla",
  "Full idag",
  "Lilla nubben",
  "Helangorakatt",
  "Vaktmästaren och professorn",
  "Helan går",
  "Hell and Gore",
  "Humlorna",
  "Utav brännvin",
  "Nu är det fest igen",
  "Nubben",
  "Nu dags taga sig en snaps strax",
  "Bordeaux, Bordeaux",
  "Ismaskinen",
  "Feta fransyskor",
  "Korkskruvens visa",
  "Vinvännernas visa",
  "Magnumflaskan Åkesson",
  "Sprittillverkarvisan",
  "Hästhandlarn",
  "Öl!",
  "Strejk på Pripps",
  "Vi älskar öl",
  "Öl-kanon",
  "Ode till ölet",
  "Ont i Huvudet",
  "Om en söt dryck",
  "Prostatabesvär",
  "Udflykt til Danmark",
  "Ölets kretslopp",
  "Punschen kommer (kall)",
  "Punschen kommer (varm)",
  "Kretsloppet",
  "Gula droppar",
  "Punschens lov",
  "När kaffet är serverat",
  "Anti-atkinsmetoden",
  "Hyllningssång till D-sektionen",
  "Data, data, ingen slår ju Data",
  "D-sek, D-sek",
  "Störst o bäst!",
  "Källarsektionen",
  "Man ska gå Data!",
  "Skär och gredelin",
  "Datatekniksektionens sommarvisa",
  "D-soldat",
  "Jag vill gå på Data-InfoCom",
  "C is for cookie",
  "Diskho-tankar",
  "Hyllningsvisa till Teknisk Fysik",
  "Everywhere we go",
  "Supa tills vi stupar",
  "Brand, Lant, Väg och Vatten",
  "A-sek är bäst",
  "Kemisternas kampvisa",
  "ING från sundets pärla",
  "Turkosa samban",
  "Bortom vägar och vatten",
  "D-Chip är grymt",
  "Vill du koda med mig?",
  "Microchipvisa 2000",
  "IQ-test",
  "CVS-visan",
  "D-visor",
  "En komplex värld",
  "SI",
  "Man ska ha MATLAB",
  "Tänk om jag vore en liten kompilator",
  "All you need is bredband",
  "The BASIC song",
  "O, hemska labb",
  "Tio små radianer",
  "Reglerteknik på bal",
  "Bussången",
  "Skolan svämmar över alla breddar",
  "Skandal",
  "Grå häst",
  "Här på en skola i Lund",
  "Studiemedelsrondo",
  "Teknologvisa",
  "Vi klarar oss nog ändå",
  "Regattasången",
  "Morbid busslåt",
  "Ebbe 1988",
  "Abbe 1989",
  "Nubbe 1990",
  "E:B 1991",
  "3-D 1992",
  "VG 1993",
  "BB 1994",
  "VM 1995",
  "Soap Addict 1996",
  "Björne 1997",
  "Skvaller 1998",
  "B1 & B2 1999",
  "Kalle 2000",
  "Ebbe 2001",
  "Äggda 2004",
  "Sopor 2005",
  "Sjön Sjøn 2006",
  "HB 2008",
  "Clownens visa 2009",
  "IP 2010",
  "Tenta 2011",
  "Plugga 2012",
  "Ebbe 2013",
  "Ebbe 2015",
  "Sallad 2016",
  "Ketchup 2017",
  "Ladok 2018",
  "Kalmarevisan",
  "Min gode vän Joel",
  "Min gode vän Jor-El",
  "Min gode vän Josef",
  "Bortom IT-samhället",
  "Den kuggade tentans visa",
  "Jag pluggar på LU",
  "Måsen",
  "Anna: en disslåt",
  "Att tenta matstat",
  "Fotboll på Fäladen",
  "Groggen",
  "JAS:en",
  "Kompistipset",
  "Mesen",
  "Moosen",
  "Musen",
  "Teknologen",
  "När månen vandrar",
  "Röda havet",
  "Finska viken",
  "Stadsparksdammen",
  "Systembolaget",
  "Bastubadet",
  "Vi gingo ner till Edekvata",
  "Lablokalen",
  "Lommabukten",
  "Karnevalen",
  "Du gamla du fria",
  "Nu grönskar det",
  "Always look on the bright side of life",
  "Balladen om herr Fredrik Åkare och den söta fröken Cecilia Lind",
  "Studentsången",
  "Brevet från kolonien",
  "Incestvisan",
  "Drunken sailor",
  "Kungssången",
  "Längtan till landet"
];

const web_titles = Object.values(songs).map(s => s.title.toLowerCase());
non_match = real.filter(it => !web_titles.includes(it.toLowerCase()));
const match = real.filter(it => web_titles.includes(it.toLowerCase()));

const editDistance = (a, b) => {
  if (a.length == 0) return b.length;
  if (b.length == 0) return a.length;

  var matrix = [];

  // increment along the first column of each row
  var i;
  for (i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  // increment each column in the first row
  var j;
  for (j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) == a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1
          )
        ); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
};

end_num = non_match
  .map(it => parseInt(it.slice(it.length - 4, it.length)))
  .filter(a => a);
normal = non_match.filter(it => !parseInt(it.slice(it.length - 4, it.length)));

pairs = non_match
  .map(word => ({
    word,
    ...web_titles
      .map(it => ({
        other_word: it,
        cost: editDistance(word.toLowerCase(), it.toLowerCase())
      }))
      .reduce((acc, curr) => (curr.cost < acc.cost ? curr : acc), {
        cost: 9999
      })
  }))
  .sort((a, b) => b.cost - a.cost)
  .filter(it => it.cost < 4);

const book_titles = real.filter(
  it => web_titles.includes(it.toLowerCase()) || pairs.find(p => p.word === it)
);

const full_songs = Object.values(songs);
console.log(full_songs);
const book_songs = full_songs.filter(it => book_titles.includes(it.title));

fs.writeFile("./booksongs.json", JSON.stringify(book_songs));
