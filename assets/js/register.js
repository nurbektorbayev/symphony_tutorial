import $ from 'jquery';

$('form').submit(function (event) {
    event.preventDefault();

    let $summary = $(this).children('.summary');

    $.ajax({
        type: 'POST',
        url: '/register',
        data: $(this).serialize(),

        success: function (response) {
            let responseStr = JSON.stringify(response);

            $summary.removeClass('d-none').removeClass('alert-danger').addClass('alert-success').html(`<p>Успешно сохраненено</p><code>${responseStr}</code>`);
            event.stopPropagation();
        },
        error: function (xhr, desc, err) {
            console.log(xhr, desc, err);
            let errorMsg = xhr.responseJSON.error;
            if (xhr.responseJSON.error.detail !== undefined) {
                errorMsg = xhr.responseJSON.error.detail;
            }
            $summary.removeClass('d-none').removeClass('alert-success').addClass('alert-danger').html(`<p>Ошибка</p><code>${errorMsg}</code>`);
        }
    });

    return false;
});