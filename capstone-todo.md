# Capstone To Do List

## Features to Add

- Logbook:
  - [] Add/display number of sightings to each species in logbook
  - [] Add/display date of each sighting
  - [] Add/display location of each sighting 
  - [] Option to show location(s) of your sightings only on a personalized map?

- Fieldguide:
  - [] Add search and/or filter options 
  - [] And don't forget a 'clear filter' button to return to full display

- Log a sighting route:
  - [] Add heading to search results (e.g., "showing medium birds" or "showing matches for squirrel")

- Map:
  - [] Add date/time (in human-readable format) to map marker info window
  - [] Show only most recent sightings (last 30 days? 7 days? Options for both? Maybe just the last 50 or some other arbitrary number?)
  - [] Add option to filter by animal/animal type?
  - [] Only display markers that are nearby (use geofire?)

- User Auth:
  - [] Keep track of user id throughout a session so that a user can only access their own logbook
  - [] Refine Firebase security rules to allow only authorized (i.e., logged in) users write access to 'sightings' and read access to 'sightings', 'species', and 'logbook' (only their own)

- Choose a trail (extra!):
  - [] Add route that allows a user to choose a trail/area to explore
  - [] Add button to map/main menu screen that leads to that route
  - [] Create 'locations' (or 'regions') resource in the DB that can be used to define centerpoint and/or bounds of regional map UIs

- Gamification! (extra!):
  - [] Badges
  - [] Other things


## Bugs to fix

- When search/filter yields no results in the 'Log a sighting' route:
  - [] Display an appropriate error message (e.g., "No results for 'tiger'" or "There are no medium amphibians")
    - [] Ideally, if there are no medium amphibians, don't display the option for medium once amphibian has been selected (for example)
  - [] Provide a way to go back and search/filter again

- On map marker info windows and in logbook entries:
  - [] Truncate lat/long displays so they're not a million digits long


## Back End

- [] Write functions to update/edit a species in the DB
- [x] Write functions to find species by name, type, and/or size
- [] Add functions to remove sightings as well as associated sightingIds from species & locations
- [] Configure locations (i.e., trail areas, individual trails, coordinates)
- [] Add locations to Firebase
- [x] Add some test sightings to Firebase
- [] Set up Firebase auth to prevent public read/write access


## Front End

- [] Build Loading Screen
- [x] Build Home Screen w/ Map (centered on current location) & Main Menu
- [x] Build 'Log a Sighting' UI
- [] Build Choose a Trail UI
- [] Build Regional Map UIs
- [x] Build Fieldguide UI
- [x] Build Logbook UI
- [] Try out 3rd-party debugger for Ionic (Davis)


