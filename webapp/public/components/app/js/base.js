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
    $('.timemask').mask('00:00', {placeholder: '00:00'});
    $('.select2').select2({
        allowClear: true,
        width: 150
    });
}