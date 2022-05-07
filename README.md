## Budget Planner - Track Expense

Manage your Expense and Budget 

An application used to set your budget and mark your expense, built with React, Redux, AsyncStorage, JavaScript, firebase and CSS.

3rd Party Library: react-native-bouncy-checkbox, victory-native, react-native-modal, react-native-swipe-gestures

## Project Status


#### Version 1.2.0

Dismiss keyboard in budget adding and entry adding screen

#### Version 1.1.0

Update Icon


#### Version 1.0.0

This project is currently published in app store. Users can login the app by email and password to retreive their stored data. Functionality to sort by additional parameters is in progress.

#### Function In Progress 

1. Dismiss keyboard in budget adding and entry adding screen (completed)

2. Add Budget Graphic Icon

3. Monthly Expense Summary

4. Roll Over Budget

5. Swipe Left/Right Animation


## Reflection

  - Side project for my own use. As a person who never be able to save money, I have always want a budget app that can roll over leftover budget to the next month. E.g. I save part of the budget this month to next month to purchase an expensive item. Also I usually bought lots of cannes for my cats in one go every 3 months. With the current available budget app, I could not record my expense properly. 
  - This app records all transactions and saves under customer's account in firebase. 
  - Navigation is a difficult part. Drawing a logic map has helped a lot
  - An unexpected obstacles would be uploading to app store. Logo, screenshot and app website are all essential to upload. 
  - What tools did you use to implement this project?
      - I started this process by using the `expo`, then adding `react-navigation` and `redux`. 
      - One of the main challenges I ran into was Data Storage. This lead me to spend a few days on a research spike into Realtime Database and Firestore Database using Firebase. Due to data structure, I have chosen Realtime Database. 
