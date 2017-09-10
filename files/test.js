function fetchText(URL, options) {
  options = Object.assign({  
    credentials: 'include'  
  }, options);
  return fetch(URL, options).then(status).then(res => res.text())
}

function status(response) {  
  if (response.status >= 200 && response.status < 300) {  
    return Promise.resolve(response)  
  } else {  
    return Promise.reject(new Error(response.statusText))  
  }  
}

function serializeParams(params){
  let str = "";
  for (let key in params) {
      //ignore undefined or null
      if(['undefined', 'null'].indexOf(typeof params[key]) !== -1) continue;
      if (str != "") {
          str += "&";
      }
      if(Array.isArray(params[key])){
        str += params[key].map(p_id => `${key}[]=${encodeURIComponent(p_id)}`).join('&')
      } else {
        str += key + "=" + encodeURIComponent(params[key]);
      }
  }
  return str;
}

function URLGenerator(baseURL, params){
  return baseURL.endsWith('?') ? baseURL + serializeParams(params) : baseURL + '?' + serializeParams(params)
}

var loc = "block-v1:ThinSchool+TSF101+2017_Fall+type@openassessment+block@683292ba486446138f5a6866e515b6ba"
var baseUrl = `https://ts.educateworkforce.com/courses/course-v1:ThinSchool+TSF101+2017_Fall/xblock/${loc}/handler/render_student_info`
var students = [
  {name: "Ani	Muhammed", grade:	10, email:	"mani.student@scgreencharter.org"},
  {name: "Fallaw	Kendal", grade:	9, email:	"kfallaw.student@scgreencharter.org"},
  {name: "Fogle	Benjamin", grade:	10, email:	"bfogle.student@scgreencharter.org"},
  {name: "Halachev	Boris", grade:	9, email:	"bhalachev.student@scgreencharter.org"},
  {name: "LaPierre	Mckenna", grade:	9, email:	"mlapierre.student@scgreencharter.org"},
  {name: "Lozano	Daniel", grade:	10, email:	"dlozano.student@scgreencharter.org"},
  {name: "Lunn	Hannah", grade:	9, email:	"halunn.student@scgreencharter.org"},
  {name: "Morse	Mary", grade: 10, email:	"mmorse.student@scgreencharter.org"},
  {name: "Padgett	Emma", grade:	10, email:	"epadgett.student@scgreencharter.org"},
  {name: "Young	Kennedy", grade:	9, email:	"kyoung.student@scgreencharter.org"},
  {name: "Young	Sophie", grade:	9, email:	"syoung.student@scgreencharter.org"},
  {name: "Sonmez	Halit", grade:	10, email:	"hosonmez.student@scgreencharter.org"},
  {name: "Veil	Christian", grade:	10, email:	"cveil.student@scgreencharter.org"},
  {name: "Conlan	Nicholas", grade:	10, email:	"nconlan.student@scgreencharter.org"},
  {name: "Hamlett	Nicholas", grade:	9, email:	"nhamlett.student@scgreencharter.org"},
]

var questionClass= '.submission__answer__part__prompt__value';
var answerClass=   '.submission__answer__part__text__value';
var notFoundClass=  '.staff-info__student__report';
var NEWLINE = '\n';
var DIVIDER = '------------------';

function addNameTag(index){
  let keys = [
    {
      key: 'name',
      value: 'Name: '
    },
    {
      key: 'grade',
      value: 'Grade: '
    },
    {
      key: 'email',
      value: 'Email: '
    },
  ]
}

async function fetchData() {
  return await Promise.all(students.map(student => 
    fetchText(URLGenerator(baseUrl, {"student_username": student.email}), {method: 'GET', credentials: "same-origin"})
  ))
}

async function run() {
  var result = await fetchData();
  console.log({result})
  result = result.map(r => jQuery(r));
  console.log({result})
  
  return result.reduce((a,c,index) => {
    var questions = c.find(questionClass)
    var answers = c.find(answerClass)
    // a+= addNameTag(index);
    a += "Name: " + students[index].name
    a += NEWLINE
    a += NEWLINE
    if(!questions.length) {
      a += c.text() || "Not found";
      a += NEWLINE;
    }else
    for( let i=0; i< questions.length; i++){
      a += questions[i].textContent || "-";
      a += NEWLINE;
      a += answers[i].textContent || "-";
      a += NEWLINE;
      a += NEWLINE;
      a += NEWLINE;
    }
    a += DIVIDER;
    a += NEWLINE;
    return a;
  }, '')

}

run().then(r => console.log(r))
