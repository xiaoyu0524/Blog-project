
document.querySelector('a.delete').addEventListener('click', function () {
    
    // Display a confirmation dialog
    const confirmed = confirm('Are you sure you want to delete?');

  // Check the user's response
  if (confirmed) {
    // User clicked "OK" (confirmed)
    // Add your code for the "OK" response here
    alert('You clicked "OK." Proceeding...');
  } else {
    // User clicked "Cancel" (not confirmed)
    // Add your code for the "Cancel" response here
    alert('You clicked "Cancel." Action canceled.');
  }
});