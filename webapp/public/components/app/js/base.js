$(function () {
    
});

function initUI() {
    $('.datepicker').datetimepicker({
        format: 'Y-m-d',
        maxDate: new Date(),
        defaultDate: new Date(),
        timepicker: false,
        inline: false
    });
}