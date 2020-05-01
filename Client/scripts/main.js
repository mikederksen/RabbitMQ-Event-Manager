function getTypeFromElement(element) {
    return $(element)
        .find("th:contains('type:')")
        .filter((a, b) => $(b).text() === "type:")
        .first()
        .parent()
        .find("abbr.type")
        .first()
        .text();
}

function getIdFromElement(element) {
    return $(element)
        .find("th:contains('message_id:')")
        .filter((a, b) => $(b).text() === "message_id:")
        .first()
        .parent()
        .find("abbr.type")
        .first()
        .text();
}

function getPayloadFromElement(element) {
    return $(element)
        .find("pre.msg-payload")
        .first()
        .text();
}

function getEvents() {
    var events = $(".facts").map((index, element) => {

        const event = {
            index: index,
            messageId: getIdFromElement(element),
            type: getTypeFromElement(element),
            payload: JSON.parse(getPayloadFromElement(element))
        };

        return event;
    });

    console.log(events);

    return events;
}

function printEvents(events) {
    $('body').empty();

    $('body').append(`<div id='accordion'></div>`)

    events
        .each((_, event) => {
            $('#accordion')
                .append(`
                    <div id='${event.index}' class='card'>
                        <div class='card-header p-0'>
                            <button 
                                class='btn btn-link w-100'
                                data-toggle='collapse'
                                data-target='#collapse${event.index}'
                            >
                                <h5 class='mb-0 p-2 text-left'>
                                    ${event.type} (${event.messageId})
                                </h5>
                            </button>
                        </div>
                        <div id='collapse${event.index}' class='collapse' data-parent='#accordion'>
                            <div class='card-body'>
                                <pre><code class='language-json'>${JSON.stringify(event.payload, null, 4)}</code></pre>
                            </div>
                        </div>
                    </div>
                `);
        });
}

function prettyPrintEvents() {
    const events = getEvents();
    printEvents(events);
}

hljs.initHighlightingOnLoad();
prettyPrintEvents();