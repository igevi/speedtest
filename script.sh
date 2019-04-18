#!/bin/sh

# Make sure the user has their variables set
if [ "$GRAPH_URL" = "REPLACE_ME" ] || [ "$API_USER" = "REPLACE_ME" ] || [ "$API_KEY" = "REPLACE_ME" ]; then
    echo "Please make sure you have set the following environment variables..."
    if [ "$GRAPH_URL" = "REPLACE_ME" ]; then echo "GRAPH_URL ✗"; else echo "GRAPH_URL ✔"; fi
    if [ "$API_USER" = "REPLACE_ME" ]; then echo "API_USER ✗"; else echo "API_USER ✔"; fi
    if [ "$API_KEY" = "REPLACE_ME" ]; then echo "API_KEY ✗"; else echo "API_KEY ✔"; fi
    exit 1
else
    # Write the graph url to the html file
    sed -i "s|REPLACE_ME|$GRAPH_URL|g" ./graph.html 

    # Start the http server
    node index &

    # Start the check loop
    while true
    do
        node speedtest
        sleep 15m
    done
fi