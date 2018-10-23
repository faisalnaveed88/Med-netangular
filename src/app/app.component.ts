/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from './services/rest.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit,OnInit {

  @ViewChild('signupForm') signupForm;
  private authenticated = false;
  private loggedIn = false;
  private signUp = {
    id: '',
    firstName: '',
    surname: '',
  };
  private availablePatients;
  private myPenguins;
  private currentUser;

  private buyInProgress = false;
  private boughtPenguin;

  private signUpInProgress = false;
  private CONGAS = ['green', 'blue', 'purple'];

  private congaName;

  ngOnInit() {
    this.route
    .queryParams
    .subscribe((queryParams) => {
      const loggedIn = queryParams['loggedIn'];
      if (loggedIn) {
        this.authenticated = true;
        return this.router.navigate(['/'])
          .then(() => {
            return this.checkWallet();
          });
      }
    });
  }
  checkWallet() {
    return this.restService.checkWallet()
      .then((results) => {
        console.log("Wallet: " + JSON.stringify(results))
        if (results['length'] > 0) {
          this.loggedIn = true;
          return this.getCurrentUser()
            .then(() => {
              this.congaName = this.CONGAS[this.getRandomIntInclusive(0, this.CONGAS.length - 1)];
              return this.getAvailablePenguins();
            })
            .then(() => {
              return this.getAvailablePenguins();
            });
        }
      });
  }
  onSignUp() {
    this.signUpInProgress = true;
    return this.restService.signUp(this.signUp)
      .then(() => {     
        return this.getCurrentUser();
      })
      .then(() => {
        this.congaName = this.CONGAS[this.getRandomIntInclusive(0, this.CONGAS.length - 1)];
        return this.getAvailablePenguins();
      })
      .then(() => {
        return this.getMyPenguins();
      })
      .then(() => {
        this.loggedIn = true;
        this.signUpInProgress = false;
      })
      .then(() => {
        return this.checkWallet();
      });
  }

  getCurrentUser() {
    return this.restService.getCurrentUser()
      .then((currentUser) => {
        this.currentUser = currentUser;
      });
  }

  setupDemo(): Promise<any> {
    return this.restService.setupDemo().then(() => {
      this.getAvailablePenguins();
    });
  }

  getAvailablePenguins() {
    this.availablePatients = this.restService.getAllPenguins();
    console.log("patient data")
    console.log (this.availablePatients)
  }

  getMyPenguins() {
    this.myPenguins = this.restService.getAllPenguins();
  }

  buyPenguin() {
    return this.restService.buyPenguin()
      .then(() => {
        console.log("-------------Added Successfully---------")
        return this.getAvailablePenguins();
      });    
  }

  private getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  constructor(private route: ActivatedRoute,
    private router: Router,
    private restService: RestService) {
}
 
  title = 'app works!';

  ngAfterViewInit() {
    $('.nav a').on('click', function(){
      $('.nav').find('.active').removeClass('active');
      $(this).parent().addClass('active');
    });

    $('.dropdown').on('show.bs.dropdown', function(e){
      $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
    });

    $('.dropdown').on('hide.bs.dropdown', function(e){
      $(this).find('.dropdown-menu').first().stop(true, true).slideUp(200);
    });

    $('.dropdown-menu li').on('click', function(){
      $(this).parent().parent().addClass('active');
    });
  }
}
