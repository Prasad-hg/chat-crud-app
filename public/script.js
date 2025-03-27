// Function to confirm before deleting
function confirmDelete(event) {
    if (!confirm("Are you sure you want to delete this chat?")) {
        event.preventDefault(); // Stops the form submission if the user clicks "Cancel"
    }
}

// Attach the event listener to all delete buttons after DOM loads
document.addEventListener("DOMContentLoaded", function () {
    let deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach(button => {
        button.addEventListener("click", confirmDelete);
    });
});
