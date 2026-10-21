# Web Development Project 5 - *Weather in Washington Right Now*

Submitted by: **Reagan George**

This web app: **This web app shows you the current weather in Washington at this moment across twelve different cities. The web app allows you to filter through cities and temperatures, and shows you the average temperature, chance of rain, and hours of sun for your updated list.**

Time spent: **4** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The site has a dashboard displaying a list of data fetched using an API call**
  - The dashboard should display at least 10 unique items, one per row
  - The dashboard includes at least two features in each row
- [x] **`useEffect` React hook and `async`/`await` are used**
- [x] **The app dashboard includes at least three summary statistics about the data** 
  - The app dashboard includes at least three summary statistics about the data, such as:
    - Average temperature (°F)
    - Average chance of rain (%)
    - Average hours of sun today
- [x] **A search bar allows the user to search for an item in the fetched data**
  - The search bar **correctly** filters items in the list, only displaying items matching the search query
  - The list of results dynamically updates as the user types into the search bar
- [x] **An additional filter allows the user to restrict displayed items by specified categories**
  - The filter restricts items in the list using a **different attribute** than the search bar 
  - The filter **correctly** filters items in the list, only displaying items matching the filter attribute in the dashboard
  - The dashboard list dynamically updates as the user adjusts the filter

The following **optional** features are implemented:

- [x] Multiple filters can be applied simultaneously
- [x] Filters use different input types
  - e.g., as a text input, a dropdown or radio selection, and/or a slider
- [ ] The user can enter specific bounds for filter values

The following **additional** features are implemented:

* [x] The temperature slider's min and max are set from the lowest and highest temperatures in the fetched data, so the whole slider is useful
* [x] The temperature slider has a short delay, so the list only updates once you stop sliding instead of on every tiny movement

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='assets/project%205.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with n-studio

## Notes

Challenges encountered while building the app:

- Using the `useEffect` hook
- Creating the temperature slider
- Thinking of an idea for the app in the first place
- Choosing which API to use

## License

    Copyright 2026 Reagan George

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
