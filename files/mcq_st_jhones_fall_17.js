/**
 * 
 * @author Raghuvaran
 * @version 0.2.5
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
  ["Kathryn Evancho ",	"kevancho2019@sjcatholicschool.org", "KathrynEvancho"],
  ["Katherine Alber ",	"kalber2018@sjcatholicschool.org", "katherinealber"],
  ["Lizzie Latham",	"llatham2019@sjcatholicschool.org", "lizzielatham"],
  ["Capelle James",	"mcapelle2019@sjcatholicschool.org", "Markcapelle"],
  ["Michael Lynch",	"mlynch2019@sjcatholicschool.org", "Michaelynch2"],
  ["Riley Fesler",	"rileyfesler101@gmail.com", "Rfesler2018"],
  ["Annika Bissinger",	"abissinger2019@sjcatholicschool.org", "annikabissinger"],
  ["Jonathan Monts",	"jmonts2018@sjcatholicschool.org", "JMonts"],
  ["Lyvers Carly",	"clyvers2018@sjcatholicschool.org", "Carly"],
  ["Jack Malone-Grippe",	"jmalonegrippe2018@sjcatholicschool.org", "Jackbmg"],
  ["Lucas Baumgarten",	"lbaumgarten2018@sjcatholicschool.org", "LBaumgarten2018"],
  ["Ted Sanchez",	"tsanchez2019@sjcatholicschool.org", "Tsanchez"],
  ["Justin May",	"jmay2019@sjcatholicschool.org", "JustinMay"],
  ["Catalina Lindstrom",	"clindstrom2018@sjcatholicschool.org", "CatalinaLindstrom"],
  ["Weeks Poole ",	"wpoole2019@sjcatholicschool.org", "Weekspoole"],
  ["Guillana Fajardo ",	"gfajardo2019@sjcatholicschool.org", "GFajardo"],
  ["Anthony Cinquemani ",	"acinquemani2019@sjcatholicschool.org", "AnthonyC"],
  ["Conley Poole ",	"cpoole2018@sjcatholicschool.org", "cpoole80"],
  ["William Smith ",	"wsmith2019@sjcatholicschool.org", "wsmith2019"],
  ["Julia VanPutte",	"jvanputte2020@sjcatholicschool.org", "juliavanputte"],
  ["Elizabeth Harris ",	"eharris2019@sjcatholicschool.org", "Elizabeth_Harris"],
  ["Isabel Poinsette ",	"ipoinsette2020@sjcatholicschool.org", "Isabel"],
  ["Megan Seidel ",	"mseidel2018@sjcatholicschool.org", "meganseidel"],
  ["Gracie Malcomb ",	"gmalcomb2019@sjcatholicschool.org", "GracieMalcomb"],
  ["Natalia Freund ",	"nfreund2019@sjcatholicschool.org", "NFreund"],
  ["Willoughby, Lauren",	"lwilloughby2018@sjcatholicschool.org", "LaurenWilloughby"],
  ["Elizabeth Poinsette",	"epoinsette2019@sjcatholicschool.org", "Elizabeth"],
  ["Colin Burns ",	"cburns2019@sjcatholicschool.org", "colinburns"],
  ["Blake Osborne",	"bosborne2018@sjcatholicschool.org", "Bosborne"],
  ["Koontz, Madison",	"mkoontz2019@sjcatholicschool.org", "maddiekoontz"],
  ].map(r => ({ name: r[0], email: r[1], answers: [], username: r[2]}));

  /* 
  Fetch progress_url
  students.map(s => fetch('https://ts.educateworkforce.com/courses/course-v1:ThinSchool+TSFSJ101+2017_Fall/instructor/api/get_student_progress_url?unique_student_identifier='+s.email,{credentials: 'include'}).then(r => r.json().then(q=> void (s.url = q.progress_url))))

  Fetch username
  students.forEach(s => fetch(s.url, {credentials: 'include'}).then(r => r.text().then(q => void (s.username=jQuery(q).find('.progress-certificates-title').text().split(' ')[4] ) )))

  Console logging usernames
  students.forEach(s => console.log(s.username'))
   */

// var question = undefined, choices ={};
var choices = {
  choice_0 : 'Not helpful',
  choice_1 : 'Somewhat helpful',
  choice_2 : 'Helpful',
  choice_3 : 'Very helpful',
  choice_4 : 'Extremely helpful',
}

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
  let loc = "block-v1:ThinSchool+TSF101+2017_Fall+type@openassessment+block@390786cbe03b4a799d66fcbd5b89c939" || prompt("Location: Ex: block-v1:ThinSchool...");
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
  let r, exec = this.exec;
  console.log({exec});return;
  if(exec === 2) 
    r = await run2(error);
  else
    r = await run(error);
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

function fetchMCQ(){
  var loc = prompt('Enter location for MCQ');
  return Promise.all(students.map(s => {
    var mcqUrl = `https://ts.educateworkforce.com/courses/course-v1%3AThinSchool%2BTSFSJ101%2B2017_Fall/submission_history/${s.username}/${loc}`;
    return fetchText(mcqUrl);
  }))
}

function getQuestion() {
  return this.question;
}

function getChoices() {
  return this.choices;
}

function promptForChoices(){
  let i = 0;
  choices = getChoices();
  if(choices.length || Object.getOwnPropertyNames(choices).length) return; 
  while(confirm('Do you have any choices left to enter?')) {
    let key = `choice_${i++}`;
    choices[key] = prompt('Please enter '+key);
  }
  this.choices = choices;
}

async function run2(){
  question = getQuestion() || prompt('Enter the question');
  this.question= question;
    promptForChoices({}); 

  (await fetchMCQ()).forEach((r,i) => {
    try {
      let DOM = jQuery(r),
      result = JSON.parse(DOM.find('pre')[0].textContent)
      if(result.student_answers){
        let ans = Object.values(result.student_answers)[0];
        students[i].answers = choices[ans] || ans;
      }else{
        students[i].answers = "Student didn't answer"
      }
    }
    catch(e){
      students[i].answers = r;
    }
  })

  return students.reduce((a,c) => {
    a += c.name + NEWLINE;
    a += c.answers + NEWLINE
    a += DIVIDER + NEWLINE
    return a;

  },question + NEWLINE + SEPERATOR + NEWLINE)

}


