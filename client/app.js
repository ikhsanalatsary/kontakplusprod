import 'angular-material/angular-material.min.css';
import 'lf-ng-md-file-input/dist/lf-ng-md-file-input.min.css';

import angular from 'angular';
import uirouter from '@uirouter/angularjs';
import angularAnimate from 'angular-animate';
import angularAria from 'angular-aria';
import ngMessage from 'angular-messages';
import angularMaterial from 'angular-material';
import checklistModel from 'checklist-model';
import lfNgMdFileInput from 'lf-ng-md-file-input';

import routing from './js/routes';
import ContactServices from './js/services';
import ContactsCtrl from './js/controller';
import ScrollDirective from './js/directives';
import './style.css';


const injection = [uirouter, angularMaterial, ngMessage, checklistModel, 'lfNgMdFileInput'];

angular.module('myApp', injection)
  .run(trace)
  .config(routing)
  .controller('ContactsCtrl', ContactsCtrl)
  .service('ContactServices', ContactServices)
  .directive('scroll', ScrollDirective);

function trace($trace, $transitions) {
  $trace.enable('TRANSITION');
  // Always on top when state change
  $transitions.onSuccess('*', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
}

trace.$inject = ['$trace', '$transitions'];
