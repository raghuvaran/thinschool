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
["Kathryn Evancho ",	"kevancho2019@sjcatholicschool.org"],
["Katherine Alber ",	"kalber2018@sjcatholicschool.org"],
["Lizzie Latham",	"llatham2019@sjcatholicschool.org"],
["Capelle James",	"jcapelle2017@sjcatholicschool.org"],
["Michael Lynch",	"mlynch2019@sjcatholicschool.org"],
["Riley Fesler",	"rfesler2018@sjcatholicschool.org"],
["Annika Bissinger",	"abissinger2019@sjcatholicschool.org"],
["Jonathan Monts",	"jmonts2018@sjcatholicschool.org"],
["Lyvers Carly",	"clyvers2018@sjcatholicschool.org"],
["Jack Malone-Grippe",	"jmalonegrippe2018@sjcatholicschool.org"],
["Lucas Baumgarten",	"lbaumgarten2018@sjcatholicschool.org"],
["Ted Sanchez",	"tsanchez2019@sjcatholicschool.org"],
["Justin May",	"jmay2019@sjcatholicschool.org"],
["Catalina Lindstrom",	"clindstrom2018@sjcatholicschool.org"],
["Weeks Poole ",	"wpoole2019@sjcatholicschool.org"],
["Guillana Fajardo ",	"gfajardo2019@sjcatholicschool.org"],
["Anthony Cinquemani ",	"acinquemani2019@sjcatholicschool.org"],
["Conley Poole ",	"cpoole2018@sjcatholicschool.org"],
["William Smith ",	"wsmith2019@sjcatholicschool.org"],
["Julia VanPutte",	"jvanputte2020@sjcatholicschool.org"],
["Elizabeth Harris ",	"eharris2019@sjcatholicschool.org"],
["Isabel Poinsette ",	"ipoinsette2020@sjcatholicschool.org"],
["Megan Seidel ",	"mseidel2018@sjcatholicschool.org"],
["Gracie Malcomb ",	"gmalcomb2019@sjcatholicschool.org"],
["Natalia Freund ",	"nfreund2019@sjcatholicschool.org"],
["Willoughby, Lauren",	"lwilloughby2018@sjcatholicschool.org"],
["Elizabeth Poinsette",	"epoinsette2019@sjcatholicschool.org"],
["Colin Burns ",	"cburns2019@sjcatholicschool.org"],
["Blake Osborne",	"bosborne2018@sjcatholicschool.org"],
["Koontz, Madison",	"mkoontz2019@sjcatholicschool.org"],
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
