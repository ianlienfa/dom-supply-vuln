import _ from 'lodash';
_.templateSettings.sourceURL = '';

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

window._ = _;
window.mbti_pics = mbti_pics;
