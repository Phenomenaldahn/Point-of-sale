$(document).ready(function () {
    fetchCategories();
    fetchItems();

    function loadCategories() {
        $.ajax({
            url: "fetch_category_list.php",
            type: "GET",
            success: function (data) {
                $("#categoryDropdown").html(data);
            }
        });
    }
    

    $("#addNewCategoryBtn").click(function () {
        let newCategory = prompt("Enter new category name:");
        if (newCategory && newCategory.trim() !== "") {
            $.ajax({
                url: "add_new_category.php",
                type: "POST",
                data: { category: newCategory.trim() },
                success: function (response) {
                    alert(response);
                    loadCategories(); // Reload the dropdown
                }
            });
        }
    });
    
    
    $(document).on("click", ".category-item", function () {
        let category = $(this).text();
        fetchItems(category);
    });

    $(document).on("click", ".item-card", function () {
        let itemName = $(this).find("h3").text();
        let itemPrice = $(this).find("p").text().replace("Price: $", "");

        let existingRow = $(`#billItems tr[data-name='${itemName}']`);
        if (existingRow.length > 0) {
            let qty = parseInt(existingRow.find(".qty").text()) + 1;
            let total = (qty * itemPrice).toFixed(2);
            existingRow.find(".qty").text(qty);
            existingRow.find(".total").text(`$${total}`);
        } else {
            $("#billItems").append(`
                <tr data-name="${itemName}">
                    <td>${itemName}</td>
                    <td>$${itemPrice}</td>
                    <td class="qty">1</td>
                    <td class="total">$${itemPrice}</td>
                    <td><button class="remove-item">X</button></td>
                </tr>
            `);
        }
        updateTotal();
    });

    $(document).on("click", ".remove-item", function () {
        $(this).closest("tr").remove();
        updateTotal();
    });

    function updateTotal() {
        let total = 0;
        $("#billItems tr").each(function () {
            total += parseFloat($(this).find(".total").text().replace("$", ""));
        });
        $("#totalAmount").text(total.toFixed(2));
    }
});
$(document).on("click", "#checkoutBtn", function () {
    if ($("#billItems tr").length === 0) {
        alert("No items in the bill!");
        return;
    }

    let receiptContent = `
        <h2>Receipt</h2>
        <table border="1" width="100%">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
    `;

    $("#billItems tr").each(function () {
        let itemName = $(this).find("td:nth-child(1)").text();
        let itemPrice = $(this).find("td:nth-child(2)").text();
        let qty = $(this).find(".qty").text();
        let total = $(this).find(".total").text();

        receiptContent += `
            <tr>
                <td>${itemName}</td>
                <td>${itemPrice}</td>
                <td>${qty}</td>
                <td>${total}</td>
            </tr>
        `;
    });

    receiptContent += `
            </tbody>
        </table>
        <h3>Total Amount: $${$("#totalAmount").text()}</h3>
        <p>Thank you for shopping with us!</p>
    `;

    let printWindow = window.open("", "", "width=400,height=600");
    printWindow.document.write(receiptContent);
    printWindow.document.close();
    printWindow.print();
});
