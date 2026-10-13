// ===== ENCODE =====
function intToRoman(n) {
  const map = [[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];
  let r = '';
  for (const [v, s] of map) { while (n >= v) { r += s; n -= v; } }
  return r;
}

function encodeWord(word) {
  if (!word) return '';
  let r = word[0];
  for (let i = 1; i < word.length; i++) {
    const c = word[i].toUpperCase();
    if (c === 'A') r += 'I';
    else if (c === 'U') r += 'V';
    else if (c === 'J') r += 'I';
    else if (c === 'L') r += 'L';
    else if (c === 'M') r += 'M';
    else if (c >= 'A' && c <= 'Z') r += intToRoman(c.charCodeAt(0) - 64);
    else r += c;
  }
  return r;
}

function encode(text) {
  return text.split(/(\s+)/).map(p => /^\s+$/.test(p) ? p : encodeWord(p)).join('');
}

// ===== DECODE =====
const TOKENS = {
  5: { 'XVIII':'r', 'XXIII':'w' },
  4: { 'VIII':'h', 'XVII':'q', 'XXII':'v', 'XXIV':'x', 'XXVI':'z' },
  3: { 'III':'c', 'VII':'g', 'XIV':'n', 'XVI':'p', 'XIX':'s', 'XXV':'y' },
  2: { 'II':'b', 'IV':'d', 'IX':'i', 'VI':'f', 'XI':'k', 'XV':'o', 'XX':'t' },
  1: { 'I':'a', 'V':'e', 'L':'l', 'M':'m' }
};

function decodeBest(text) {
  if (!text) return '';
  const n = text.length;
  const dp = new Array(n + 1).fill(Infinity);
  const parent = new Array(n + 1).fill(null);
  dp[0] = 0;

  for (let i = 0; i < n; i++) {
    if (dp[i] === Infinity) continue;
    for (let L = 5; L >= 1; L--) {
      if (i + L > n) continue;
      const sub = text.substr(i, L);
      if (TOKENS[L] && TOKENS[L][sub]) {
        if (dp[i] < dp[i + L]) {
          dp[i + L] = dp[i];
          parent[i + L] = { len: L, val: TOKENS[L][sub] };
        }
      }
    }
    if (dp[i] + 1 < dp[i + 1]) {
      dp[i + 1] = dp[i] + 1;
      parent[i + 1] = { len: 1, val: text[i] };
    }
  }

  if (dp[n] === Infinity) return text;

  let result = '';
  let i = n;
  while (i > 0) {
    const p = parent[i];
    result = p.val + result;
    i -= p.len;
  }
  return result;
}

// ==================================================
// MEGA DICTIONARY — 1500+ words
// English + Hindi + Urdu + Punjabi + Bengali (romanized)
// ==================================================
const WORDS = [
  // ===== ENGLISH — Function words =====
  'the','be','to','of','and','a','in','that','have','i','it','for','not','on',
  'with','he','as','you','do','at','this','but','his','by','from','they','we',
  'say','her','she','or','an','will','my','one','all','would','there','their',
  'what','so','up','out','if','about','who','get','which','go','me','when',
  'make','can','like','time','no','just','him','know','take','people','into',
  'year','your','good','some','could','them','see','other','than','then','now',
  'look','only','come','its','over','think','also','back','after','use','two',
  'how','our','work','first','well','way','even','new','want','because','any',
  'these','give','day','most','us','is','was','are','were','been','has','had',
  'did','does','done','went','going','gone','came','coming','said','saw','seen',
  'made','making','took','taking','taken','got','getting','given','found','find',
  'told','tell','thought','thinking','knew','known','held','hold','brought',
  'bring','wrote','write','written','read','reading','hello','world','yes',
  'ok','okay','thank','thanks','please','sorry','welcome','goodbye','bye',
  'hi','hey','love','hate','happy','sad','angry','bad','big','small','hot',
  'cold','fast','slow','night','morning','evening','today','tomorrow',
  'yesterday','week','month','food','water','tea','coffee','home','house',
  'school','college','office','city','country','india','friend','family',
  'mother','father','sister','brother','son','daughter','boy','girl','man',
  'woman','child','name','where','here','there','fair','far','fire','fine',
  'still','much','many','more','less','very','really','actually','always',
  'never','sometimes','often','soon','later','early','already','yet','again',
  'once','twice','every','each','both','either','neither','some','none',
  'anyone','someone','everyone','nobody','anybody','somebody','everybody',
  'something','anything','nothing','everything','thing','things','place',
  'world','life','death','birth','love','heart','mind','body','head','hand',
  'eye','ear','mouth','nose','hair','face','leg','arm','foot','finger',
  'money','cash','rupee','dollar','price','cost','value','worth','rich',
  'poor','happy','sad','good','bad','best','worst','better','worse',
  'right','wrong','true','false','real','fake','new','old','young','big',
  'small','long','short','tall','high','low','hot','cold','warm','cool',
  'easy','hard','simple','complex','beautiful','ugly','clean','dirty',
  'open','close','start','stop','begin','end','finish','continue','keep',
  'give','take','send','receive','buy','sell','pay','earn','spend','save',
  'eat','drink','sleep','wake','walk','run','sit','stand','jump','fly',
  'swim','drive','ride','read','write','speak','listen','hear','see',
  'watch','look','feel','touch','smell','taste','think','know','understand',
  'remember','forget','learn','teach','study','play','work','rest','help',
  'need','want','wish','hope','dream','try','fail','win','lose','fight',
  'war','peace','friend','enemy','stranger','guest','host','team','group',
  'class','school','college','university','teacher','student','book','pen',
  'pencil','paper','desk','chair','table','door','window','wall','floor',
  'roof','room','kitchen','bathroom','bedroom','garden','park','road',
  'street','city','village','town','country','state','nation','world',
  'earth','sun','moon','star','sky','cloud','rain','snow','wind','storm',
  'fire','water','earth','air','tree','flower','grass','leaf','root',
  'fruit','vegetable','rice','bread','milk','sugar','salt','spice','oil',
  'fish','meat','chicken','egg','cheese','butter','honey','jam','cake',
  'sweet','sour','bitter','spicy','tasty','delicious','hungry','thirsty',
  'tired','sleepy','awake','busy','free','ready','late','early','now',
  'yesterday','tomorrow','today','tonight','morning','afternoon','evening',
  'night','midnight','noon','week','month','year','hour','minute','second',
  'monday','tuesday','wednesday','thursday','friday','saturday','sunday',
  'january','february','march','april','may','june','july','august',
  'september','october','november','december','spring','summer','autumn',
  'winter','season','weather','climate','temperature','degree','hot','cold',

  // ===== HINDI (Roman script) =====
  'hai','hain','ho','hun','hoon','tha','thi','the','kya','kyu','kyun',
  'kaise','kaisa','kaisi','kahan','kab','kaun','kaunsa','kitna','kitni',
  'mera','meri','mere','tera','teri','tere','uska','uski','uske','hamara',
  'hamari','hamare','tumhara','tumhari','tumhare','apna','apni','apne',
  'tum','hum','main','aap','yeh','ye','woh','wo','yeh','vah','khud',
  'bhai','behen','bahan','dost','yaar','mitra','naam','kaam','ghar',
  'gaon','sheher','shahar','desh','bharat','hindustan','achha','acha',
  'achhi','achhe','theek','thik','sahi','galat','kal','aaj','abhi',
  'phir','fir','lekin','magar','aur','bhi','toh','to','hi','na','haan',
  'nahi','nahin','kuch','kuchh','sab','sabh','log','baat','puchna',
  'bolna','dekhna','dekh','dekha','sunn','suna','karna','kar','kiya',
  'kar','karo','karna','karta','karti','karte','kiya','kiye','karunga',
  'karogi','jana','ja','gaya','gayi','gaye','aana','aa','aaya','aayi',
  'aaye','dena','de','diya','diye','lena','le','liya','liye','khana',
  'kha','khaya','khaye','peena','pee','piya','piye','sona','so','soya',
  'soye','uthna','uth','utha','baithna','baith','baitha','chalna','chal',
  'chala','chali','chale','khelna','khel','khela','gaana','gaa','gaaya',
  'nachna','nach','nacha','padhna','padh','padha','padhi','padhe','likhna',
  'likh','likha','likhi','likhe','samajh','samjha','milna','mil','mila',
  'mili','mile','pyar','pyaar','mohabbat','ishq','dil','jaan','zindagi',
  'jeevan','sapna','khwab','khushi','dukh','sukh','gham','kaisa','jaisa',
  'kabhi','koi','kisi','kisiko','kuch','kitab','pustak','didi','bhaiya',
  'chacha','chachi','mama','mami','nana','nani','dada','dadi','beta',
  'beti','baccha','bacche','aadmi','aurat','ladka','ladki','aurton',
  'sab','saja','saza','raha','rahi','rahe','raho','waqt','samay','din',
  'raat','subah','shaam','dopahar','hafte','mahine','saal','sal','baras',
  'paani','pani','roti','chawal','sabzi','dal','doodh','chai','coffee',
  'mithai','namak','mirch','masala','tel','ghee','makhan','dahi','paneer',
  'murga','gosh','machli','andey','kela','aam','seb','santra','angoor',
  'tarbooz','kheera','tamatar','pyaz','aloo','gobhi','matar','gaajar',
  'paisa','rupaya','kharid','bech','dena','lena','udhaar','karz','amir',
  'garib','seth','dukandar','khareeddar','bazaar','dukan','malls','bank',
  'khet','kheti','kisan','fasal','bail','gaay','bhains','bakri','kutta',
  'billi','chuha','saanp','sher','hathi','ghoda','bandar','tota','kabutar',
  'makaan','ghar','kamra','chhat','deewar','darwaza','khidki','farsh',
  'kitchen','bathroom','bedroom','baithak','aangan','chauk','gali','sadak',
  'mandir','masjid','girja','gurudwara','puja','namaz','ibadat','bhagwan',
  'khuda','allah','rab','ishwar','shiv','ram','krishna','hanuman','durga',
  'lakshmi','saraswati','ganesh','kartik','mata','pita','bhagwan','atma',
  'dharam','karma','moksha','swarg','narak','punya','paap','sach','jhoot',
  'nyay','insaaf','adalat','judge','vakil','kanoon','police','chor','daku',
  'jail','saaza','muafi','mafi','shukriya','dhanyavad','kripya','kripya',
  'swagat','namaste','namaskar','pranam','salaam','adaab','alvida','khuda',
  'hafiz','milte','fir','phir','kabhi','mushkil','aasan','saral','kathin',
  'imtihaan','pariksha','result','number','marks','pass','fail','top',
  'school','college','master','teacher','guru','shishya','student','vidyarthi',

  // ===== URDU (Roman script) =====
  'salaam','adaab','khuda','hafiz','allah','rab','maula','mola',
  'shukriya','meherbani','kripya','mohabbat','ishq','dil','jaan','zindagi',
  'khwab','khushi','gham','dukh','sukh','duniya','jahaan','qayamat',
  'insaan','aurat','mard','ladka','ladki','bhai','behen','dost','yaar',
  'walid','walida','abbu','ammi','beta','beti','ghar','makaan','kamra',
  'bazaar','dukan','paisa','rupaya','kharid','bech','udhaar','karz',
  'amir','garib','seth','dukandar','khet','kheti','kisan','fasal',
  'khaana','peena','sona','uthna','baithna','chalna','khelna','padhna',
  'likhna','samajh','milna','mil','mila','pyar','mohabbat','dil',
  'jaan','zindagi','jeena','marna','maut','janam','paidaish','shadi',
  'nikah','talaq','rishta','rishtedaar','khandaan','khaandaan',
  'accha','bukhara','bura','sundar','badsoorat','saaf','ganda',
  'naya','purana','jawan','buddha','lamba','chota','ooncha','neecha',
  'garam','thanda','naram','sakht','asaaan','mushkil','seedha',
  'khula','band','shuru','khatam','chalu','rukna','daudna','chalna',
  'khana','peena','sona','jagna','uthna','baithna','khada','girna',
  'uthana','dena','lena','bechna','khareedna','bharna','vasool',
  'siksha','taleem','ilm','ilm','ilm','ilm','ilm','ilm','ilm','ilm',
  'ustad','shagird','taleba','taleb','kitab','kalam','kaghaz',
  'khushboo','rang','roshni','andhera','suraj','chaand','sitara',
  'aasman','zameen','pani','aag','hawa','mitti','darakht','phool',
  'patte','jadd','phal','sabzi','chawal','roti','doodh','cheeni',
  'namak','masala','mirch','pyaz','lehsun','adrak','dhaniya','pudina',
  'sabz','gulabi','neela','peela','hara','kaala','safed','bhura',
  'aankh','kaan','naak','mooh','zubaan','dant','hoth','baal','chehra',
  'haath','pair','ungli','sir','dil','pet','kamar','pair','gardan',

  // ===== PUNJABI (Roman) =====
  'sat','sri','akal','waheguru','ji','ka','ki','ke','da','di','de',
  'nu','te','vich','ton','nal','layi','hunda','hunde','hondi','sada',
  'sadi','sade','tera','teri','tere','mera','meri','mere','asi','tusi',
  'oh','eh','kiddan','ki','kiven','kad','kithon','kithay','kithe',
  'kinna','kitna','kine','paani','roti','khaana','doodh','chah',
  'ghar','kamra','bazar','paise','khet','kheti','kisan','fasal',
  'sundar','bhalla','bura','nawa','purana','jawan','bhudda','lamba',
  'chota','garam','thanda','khula','band','shuru','khatam','sikh',
  'punjab','punjabi','punjabiyan','bhaji','bhaji','parantha','lassi',
  'bhangra','giddha','salwar','kurta','pagdi','chunni','khes',

  // ===== BENGALI (Roman) =====
  'ami','tumi','apni','se','ta','ei','oi','keno','kemon','kothay',
  'kokhon','ke','ki','koto','bhalo','kharap','notun','purano','choto',
  'boro','lomba','garam','thanda','khula','bondho','shuru','shesh',
  'bari','ghor','ghar','kotha','boi','kalom','kagoj','pani','khabar',
  'bhat','dal','mach','mangsho','dudh','cha','mishti','nun','lonka',
  'bhalobasha','prem','mon','pran','jibon','shopno','khusi','dukkho',
  'suk','din','rat','shokal','bikal','shondha','hapta','mash','bochor',
  'ma','baba','bhai','bon','didi','dada','chele','meye','lok','manush',
  'boudi','kaka','kaki','mama','mami','dadu','dida',

  // ===== COMMON NAMES / TITLES =====
  'salman','tanuja','nadini','patna','delhi','mumbai','kolkata','chennai',
  'bangalore','hyderabad','pune','ahmedabad','jaipur','lucknow','kanpur',
  'bihar','up','mp','rajasthan','gujarat','maharashtra','kerala','goa',
  'punjab','haryana','kashmir','assam','odisha','telangana','andhra',
  'mr','mrs','ms','miss','sir','madam','doctor','dr','professor','prof',
  'engineer','advocate','lawyer','judge','collector','officer','inspector',
  'constable','sipahi','soldier','army','navy','airforce','pilot','driver',
  'conductor','sweeper','cook','waiter','barber','tailor','carpenter',
  'blacksmith','potter','weaver','farmer','trader','banker','clerk',
  'manager','boss','owner','partner','customer','client','guest','host',

  // ===== NUMBERS / TIME =====
  'zero','one','two','three','four','five','six','seven','eight','nine',
  'ten','hundred','thousand','lakh','crore','million','billion',
  'first','second','third','fourth','fifth','sixth','seventh','eighth',
  'ninth','tenth','ek','do','teen','char','chaar','panch','paanch','chhah',
  'che','saat','aath','nau','das','bees','tees','chalis','pachas',
  'saath','sattar','assi','nabbe','sau','hazaar','lakh','crore',
  'month','week','day','hour','minute','second','today','tomorrow',
  'yesterday','night','morning','evening','noon','midnight',

  // ===== INTERJECTIONS / EXPRESSIONS =====
  'hmm','umm','ohh','ahh','wow','woww','yay','yippee','oops','ouch',
  'ooh','aah','haha','hehe','hihi','lol','lmao','rofl','omg','wtf',
  'yeah','yep','nope','naw','yup','okey','ok','okay','alright','fine',
  'cool','nice','great','awesome','amazing','wonderful','fantastic',
  'superb','excellent','fantabulous','terrific','fabulous','super'
];

const DICT = {};
for (const w of WORDS) {
  const enc = encodeWord(w).toLowerCase();
  if (!DICT[enc]) DICT[enc] = w;
}

function decodeWord(word) {
  if (!word) return '';
  const first = word[0];
  const rest = word.slice(1);
  if (!rest) return first;

  const hit = DICT[word.toLowerCase()];
  if (hit) {
    const isCapital = first === first.toUpperCase() && first !== first.toLowerCase();
    const firstChar = isCapital ? first.toUpperCase() : first.toLowerCase();
    return firstChar + hit.slice(1);
  }

  const decodedRest = decodeBest(rest);
  const isCapital = first === first.toUpperCase() && first !== first.toLowerCase();
  const firstChar = isCapital ? first.toUpperCase() : first.toLowerCase();
  return firstChar + decodedRest;
}

function decode(text) {
  return text.split(/(\s+)/).map(p => /^\s+$/.test(p) ? p : decodeWord(p)).join('');
}

// ===== UI =====
let mode = 'encode';
const input = document.getElementById('input');
const output = document.getElementById('output');
const convertBtn = document.getElementById('convertBtn');
const copyBtn = document.getElementById('copyBtn');
const clearBtn = document.getElementById('clearBtn');
const inputBadge = document.getElementById('inputBadge');
const outputBadge = document.getElementById('outputBadge');
const toast = document.getElementById('toast');
const tabs = document.querySelectorAll('.tab');

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1800);
}

function setOutput(text, isEmpty = false) {
  output.classList.remove('has-result');
  if (isEmpty) {
    output.classList.add('empty');
    output.innerHTML = '<span>' + text + '</span><span class="cursor"></span>';
    outputBadge.textContent = '0 CHARS';
  } else {
    output.classList.remove('empty');
    output.innerHTML = '<span class="output-value">' + text.replace(/</g, '&lt;') + '</span>';
    outputBadge.textContent = text.length + ' CHARS';
    void output.offsetWidth;
    output.classList.add('has-result');
  }
}

tabs.forEach(tab => {
  tab.onclick = () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    mode = tab.dataset.mode;
    input.placeholder = mode === 'encode' ? 'Type normal English here...' : 'Paste encoded text here...';
    input.value = '';
    inputBadge.textContent = '0 CHARS';
    setOutput('Awaiting input', true);
  };
});

convertBtn.addEventListener('click', (e) => {
  const rect = convertBtn.getBoundingClientRect();
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
  ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
  convertBtn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);

  const t = input.value;
  if (!t.trim()) { setOutput('(empty)', true); return; }
  const result = mode === 'encode' ? encode(t) : decode(t);
  setOutput(result, false);
});

copyBtn.onclick = () => {
  const txt = output.textContent.trim();
  if (!txt || txt === 'Awaiting input') return;
  navigator.clipboard.writeText(txt).then(() => {
    showToast('✓ COPIED');
  });
};

clearBtn.onclick = () => {
  input.value = '';
  inputBadge.textContent = '0 CHARS';
  setOutput('Awaiting input', true);
};

input.addEventListener('input', () => {
  inputBadge.textContent = input.value.length + ' CHARS';
});