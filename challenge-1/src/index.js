import _ from 'lodash';
import $ from "jquery";
_.templateSettings.sourceURL = '';
const someUsefulLibrary = _;

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
