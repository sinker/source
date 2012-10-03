// custom jQuery filter selector `icontains` for text matching
// http://answers.oreilly.com/topic/1055-creating-a-custom-filter-selector-with-jquery/
$.expr[':'].icontains = function(element, index, match) {
    return (element.textContent || element.innerText || "").toUpperCase().indexOf(match[3].toUpperCase()) >= 0;
};

$(document).ready(function() {
    // only provide filter form if js is enabled
    $('#js-filter-form').show();
    var listFilter = $('#list-filter');
    var filteredList = $('#filterable-list');
    
    // after each keystroke in #list-filter input, do a case-insensitive
    // search against all the `li` elements inside #filterable-list
    $(listFilter).change(function() {
        var filterVal = $(this).val();
        if (filterVal) {
            // hide the list container to avoid potential repaints
            filteredList.css("display","none");
            // hide items that don't have matching text, lists that don't have
            // visible items, and blocks that don't have visible lists
            $(filteredList).find('li:not(:icontains(' + filterVal + '))').css("display","none");
            $(filteredList).find('.filter-list:not(:has(li:visible))').css("display","none");
            $(filteredList).find('.filter-block:not(:has(li:visible))').css("display","none");
            // show blocks/lists/items that contain matching text
            $(filteredList).find('.filter-block:has(li:icontains(' + filterVal + '))').css("display","block");
            $(filteredList).find('.filter-list:has(li:icontains(' + filterVal + '))').css("display","block");
            $(filteredList).find('li:icontains(' + filterVal + ')').css("display","list-item");
            // show the list container again
            filteredList.css("display","block");
        } else {
            // nothing in filter form, so make sure everything is visible
            $(filteredList).find(".filter-block").css("display","block");
            $(filteredList).find(".filter-list").css("display","block");
            $(filteredList).find("li").css("display","list-item");
        }
        
        // show 'no results' message if we've removed all the items
        if ($('.filter-list > li:visible').length == 0) {
            $('#no-results').remove();
            $('#js-filter-form').after('<p id="no-results">No matching results found.</p>');
        } else {
            $('#no-results').remove();
        }
        return false;
    }).keyup(function() {
        $(this).change();
    });
});
