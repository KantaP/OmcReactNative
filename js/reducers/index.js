
'use strict';

import { combineReducers } from 'redux';

import drawer from './drawer';
import route from './route';
import modal from './modal';
import map from './map';
import user from './user'
import load from './loading'
import job from './job'

export default combineReducers({
 	
 	drawer,
 	route,
	modal,
	map,
	user,
	load,
	job
 	
})
