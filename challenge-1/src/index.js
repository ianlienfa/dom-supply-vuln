import _ from 'lodash';
import $ from "jquery";
import cors from 'cors'
_.templateSettings.sourceURL = '';
const someUsefulLibrary = _;

import enfj_pic from './mbti/ENFJ.jpg';
import enfp_pic from './mbti/ENFP.jpg';
import entj_pic from './mbti/ENTJ.jpg';
import entp_pic from './mbti/ENTP.jpg';
import esfj_pic from './mbti/ESFJ.jpg';
import esfp_pic from './mbti/ESFP.jpg';
import estj_pic from './mbti/ESTJ.jpg';
import estp_pic from './mbti/ESTP.jpg';
import infj_pic from './mbti/INFJ.jpg';
import infp_pic from './mbti/INFP.jpg';
import intj_pic from './mbti/INTJ.jpg';
import intp_pic from './mbti/INTP.jpg';
import isfj_pic from './mbti/ISFJ.jpg';
import isfp_pic from './mbti/ISFP.jpg';
import istj_pic from './mbti/ISTJ.jpg';
import istp_pic from './mbti/ISTP.jpg';

const mbti_pics = {
    'ENFJ': enfj_pic,
    'ENFP': enfp_pic,
    'ENTJ': entj_pic,
    'ENTP': entp_pic,
    'ESFJ': esfj_pic,
    'ESFP': esfp_pic,
    'ESTJ': estj_pic,
    'ESTP': estp_pic,
    'INFJ': infj_pic,
    'INFP': infp_pic,
    'INTJ': intj_pic,
    'INTP': intp_pic,
    'ISFJ': isfj_pic,
    'ISFP': isfp_pic,
    'ISTJ': istj_pic,
    'ISTP': istp_pic
};


function dummy_query(){
    // Selects elements with the class "dummy-class" and logs their text content to the console
    $('.dummy-class').each(function() {
        console.log($(this).text());
    });
    const count = $('.count-me').length;
    console.log(`There are ${count} elements with the class "count-me".`);
    const isVisible = $('#dummy-element').is(':visible');
    console.log(`Is #dummy-element visible? ${isVisible}`);
    $('.dummy-input').each(function() {
        console.log($(this).val());
    });
    const firstItem = $('.first-item').first();
    console.log(firstItem.text());
    console.log($().jquery);
}

function pass_val(subject, obj){
    var template_result1 = "Ian has a cat.";
    var template_result2 = "And its name is Fluffy.";
    var templateString = '';
    if(subject === 'user'){
        templateString = '<%= user.name %> has a <%= user.pet %>';
    } 
    else if(subject === 'pet'){
        templateString = 'and its name is <%= pet.name %>.';
    }
    const template = someUsefulLibrary.template(templateString, { variable: subject });
    const populated = template(obj);
    return populated;
}

window.pass_val = pass_val;
window.dummy_query = dummy_query;
window.$ = window.JQuery = $;
window.mbti_pics = mbti_pics;
