## Overview
![cwrd-test-app](https://github.com/krazy-koala/crwd/assets/134880990/7c376760-e938-4154-946a-cc9f4191d818)

### Environment setup

The following should be installed on your local machine before moving on to 'Running the project' section:
- NodeJS (v18.16.0)
- NPM (v9.5.1)

The dependency versions mentioned above are the latest as of 05/26/2023.

### Running the project

If you haven't already, install the node_modules that this project requires.  Open your CLI and run

#### `npm i`

To start the project, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


## High-level architecture

### Diagram
The image provided below shows the relationship between the major UI components in the project.  This should help
the reviewers navigate the code as they read through it.

A few points to note:
- The Table component is a generic component that simply takes an array of data (any shape) and a list of column objects.  Together, these inputs
allow Table to render the rows and columns using semantic HTML.  Internally, the Table component doesn't need to know anything about
the shape of each item in data other than that it should be an object.
- The DevicesTable component is less generic and has other components and logic that are specific to viewing, selecting, and downloading devices.
It wraps around the Table component and provides the required data and columns to it.

![crwd-test-architecture](https://github.com/krazy-koala/crwd/assets/134880990/556a8208-e82b-4c0c-9bd8-4874bce29bec)

###

## Testing the component manually

This section assumes that the project is already up and running in the browser via the `npm start` command.
  
### Basic functionality
#### Selecting Devices
##### Individual Row Selection
1. Initially, the checkboxes in the checkbox column are in the unchecked state.
2. Click on any checkbox to select a row.  The UI should be updated as follows:
   - The checkbox state should change to checked.  No other checkboxes in the column should have their state changed.
   - The background color of the row should change to a light grey color.
   - Above the table, the text to the right of the Select All checkbox should change from 'None Selected' to '1 Selected'.
3. Click on any other unchecked checkbox.  The UI should be updated similar to step 2.  For step 2.3, the text should read '2 Selected' instead.
4. Click on one of the checked checkboxes.  The UI should be updated as follows:
   - The checkbox state should change to unchecked.  No other checkboxes in the column should have their state changed.
   - The background color of the row should revert back to its default background color (white).
   - Above the table, the text to the right of the Select All checkbox should change from '2 Selected' to '1 Selected'.
5. Repeat step 4 for the other checked checkbox.  UI updates similar to step 4 should change.  For step 4.3, the text should read 'None Selected' instead.
  
##### Select All checkbox
1. Initially, the Select All checkbox should be in an unchecked state.
2. Click on the Select All checkbox.  The UI should be updated as follows:
   - All checkboxes in the checkbox column should change to the checked state.
   - The background color of the selected rows should change to a light grey color.
   - The text to the right of the Select All checkbox should change from 'None Selected' to '5 Selected' (or however many rows are in the table).
3. Click on one of the checked checkboxes:  The UI should be update as follows:
   - The Select All checkbox should change to the indeterminate state.
   - The checkbox state should change to unchecked.  No other checkboxes in the column should have their state changed.
   - The background color of the row should revert back to its default background color (white).
   - Above the table, the text to the right of the Select All checkbox should change from '5 Selected' to '4 Selected'.
4. Click on the unchecked checkbox from step 3:
   - The UI should be updated to look identical to step 2.
   - The Select All checkbox should change from indeterminate to checked.
5. Click on all checked checkboxes in the table to deselect all rows manually.  After all rows are deselected, the UI should be in its original state with
   no checkboxes anywhere checked and display 'None Selected' to the right of the Select All checkbox.
6. Click on any individual checkbox in the checkbox column to put the Select All checkbox into an indeterminate state.
7. Click on the Select All checkbox:
   - The Select All checkbox should change to checked state.
   - All checkboxes in the checkbox column should change to the checked state.
8. Clicking on Select All checkbox should deselect all checkboxes in the checkbox column.

#### Download Selected Devices
##### Visibility of Download Selected button
This should only be visible if all selected rows have a Status column value of 'Available'.
1. Initially, no table rows are selected and the Download Selected button is not visible.
2. Click on a checkbox belonging to a row where the Status column displays 'Available':
   - The Download Selected button should become visible.
3. Repeat Step 2 for a similar row.  The Download Selected button should stay visible.
4. Click on a checkbox belonging to a row where the Status column displays 'Scheduled':
   - The Download Selected button should be hidden.
5. Click on the Select All checkbox.
   - If all selected rows have a Status column value of 'Available', then the Download Selected button should be visible.
   - Otherwise, it should be hidden.
  
##### Displaying the Download Selected Modal
This test case assumes that there are selected rows with a Status column value of 'Available' and the Download Selected button is visible.
1. Click on the Download Selected button to display a Modal.
2. The Modal should display the following:
   - In the header section, there should be a title on the left and a close button on the right.
   - The body section should display a table with the selected rows.  Each row has two columns - Device and Path.  Verify these are the same
     as what's selected in the DevicesTable.
   - The footer section displays two buttons to the right - Cancel and Confirm.  Clicking either of these will close the modal.
3. While the Modal is open, focus should be trapped inside the modal
   - Pressing Tab or Shift + Tab should cycle focus through the different buttons and should not leave the modal.
   - The user should not be able to interact with components outside of the modal.
   - Clicking on the overlay should not close the modal.  This is by design.
