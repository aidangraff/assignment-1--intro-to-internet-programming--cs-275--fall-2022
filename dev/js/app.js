window.onload = () => {
    let firstMatrix = document.getElementById(`normal`);
    let secondMatrix = document.getElementById(`flipped`);
    let content = ``;

    let input = window.prompt(`Tell me the size of your table`, 20);
    input = parseInt(input, 10);

    let myMatrix = new Array(input);

    content = `<table>`;


    for(let x = 0; x < myMatrix.length; x++) {
        content += `<tr>`;
        myMatrix[x] = new Array(input);

        for(let y = 0; y < myMatrix.length; y++) {
            myMatrix[x][y] = 1 + y + (x * myMatrix.length);

            content += `<td>${myMatrix[x][y]}</td>`;
        }

        content += `</tr>`;
    }

    content += `</table>`;

    firstMatrix.innerHTML = content;



    content = `<table>`;


    for(let x = 0; x < myMatrix.length; x++) {
        content += `<tr>`;
        myMatrix[x] = new Array(input);

        for(let y = 0; y < myMatrix.length; y++) {
            myMatrix[x][y] = (1 + y + (x * myMatrix.length));

            myMatrix[x][y] = (1 + (myMatrix.length * myMatrix.length) - myMatrix[x][y]);

            content += `<td>${myMatrix[x][y]}</td>`;
        }

        content += `</tr>`;
    }

    content += `</table>`;

    secondMatrix.innerHTML = content;

};
