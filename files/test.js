/**
 * 
 * @author Raghuvaran
 * @version 0.2.1
 */

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

// https://stackoverflow.com/a/18197511/6855597
function download(filename, text) {
  t = text;
  console.log(text);
  var pom = document.createElement('a');
  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + text.replace(/([^\r])\n/g, "$1\r\n"));
  pom.setAttribute('download', filename);

  if (document.createEvent) {
      var event = document.createEvent('MouseEvents');
      event.initEvent('click', true, true);
      pom.dispatchEvent(event);
  }
  else {
      pom.click();
  }
}
var t = '';
var students = [
  ["Ani	Muhammed", 10, "mani.student@scgreencharter.org"],
  ["Fallaw	Kendal", 9, "kfallaw.student@scgreencharter.org"],
  ["Fogle	Benjamin", 10, "bfogle.student@scgreencharter.org"],
  ["Halachev	Boris", 9, "bhalachev.student@scgreencharter.org"],
  ["LaPierre	Mckenna", 9, "mlapierre.student@scgreencharter.org"],
  ["Lozano	Daniel", 10, "dlozano.student@scgreencharter.org"],
  ["Lunn	Hannah", 9, "halunn.student@scgreencharter.org"],
  ["Morse	Mary", 10, "mmorse.student@scgreencharter.org"],
  ["Padgett	Emma", 10, "epadgett.student@scgreencharter.org"],
  ["Young	Kennedy", 9, "kyoung.student@scgreencharter.org"],
  ["Young	Sophie", 9, "syoung.student@scgreencharter.org"],
  ["Sonmez	Halit", 10, "hosonmez.student@scgreencharter.org"],
  ["Veil	Christian", 10, "cveil.student@scgreencharter.org"],
  ["Conlan	Nicholas", 10, "nconlan.student@scgreencharter.org"],
  ["Hamlett	Nicholas", 9, "nhamlett.student@scgreencharter.org"],
].map(r => ({ name: r[0], grade: r[1], email: r[2], answers: []}))

var questionClass= '.submission__answer__part__prompt__value';
var answerClass=   '.submission__answer__part__text__value';
var notFoundClass=  '.staff-info__student__report';
var NEWLINE = '\n';
var DIVIDER = '------------------';
var SEPERATOR = '*********************************';

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

function fetchData(error) {
  if(error) alert('There was an error while fetching data please try again');
  let loc = prompt("Location: Ex: block-v1:ThinSchool...");
  if(loc === null || loc === "") throw new Error("Invalid location!");
  let baseUrl = `https://ts.educateworkforce.com/courses/course-v1:ThinSchool+TSF101+2017_Fall/xblock/${loc}/handler/render_student_info`
  
  return Promise.all(students.map(student => 
    fetchText(URLGenerator(baseUrl, {"student_username": student.email}), {method: 'GET', credentials: "same-origin"})
  ))
}

async function run(error=false) {
  let final_questions =[], returnable ='';
  (await fetchData(error))
  // .map(r => jQuery(r))
  .forEach((c,index) => {
    c = jQuery(c)
    let questions = c.find(questionClass)
    let answers = c.find(answerClass)
    if(!questions.length) {
      final_questions[0] = final_questions[0] || 'No question found'
      students[index].answers[0] = c.text().replace(/(\r\n|\n|\r)/gm,"***") || "Not found";
    }else
    for( let i=0; i< questions.length; i++){
      final_questions[i] = questions[i].textContent || final_questions[i] || '-'
      students[index].answers[i] = answers[i].textContent || '-';
    }
  })
  for( let i=0; i<final_questions.length; i++ ) {

    returnable += SEPERATOR
    returnable += NEWLINE
    returnable += (SEPERATOR[0] || '') + '  ' + final_questions[i]
    returnable += NEWLINE
    returnable += SEPERATOR
    returnable += NEWLINE
    students.forEach(s => {
      returnable += DIVIDER
      returnable += NEWLINE
      returnable += 'Name: ' + s.name
      returnable += NEWLINE
      returnable += NEWLINE
      returnable += 'Answer: ' + (s.answers[i] || s.answers[0])
      returnable += NEWLINE
      returnable += NEWLINE
    })

    returnable += NEWLINE

  }

  return returnable;

}

function throwOuput(r) {
  console.clear();
  console.log(r);
}

var counter = 0;

async function init(error) {
try{
  if(counter > 3) return false;
  counter++;
  let r = await run(error);
  throwOuput(r);
  return true;
}
catch(e) {
  await init(true)
}
}

init().then(r => { if(typeof r === "boolean" && r === false) alert('Bad luck again!! Contact raghu@chowda.in for help')}).catch(() =>
    
  alert('Bad luck again! Contact raghu@chowda.in for help')
)
