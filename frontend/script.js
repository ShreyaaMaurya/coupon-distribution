document.getElementById("claimBtn").addEventListener("click", async () => {
    try {
        let response = await fetch("http://localhost:5000/api/coupons/claim", { method: "POST" });
        let data = await response.json();
        document.getElementById("message").innerText = data.message || `Coupon Code: ${data.coupon}`;
    } catch (error) {
        document.getElementById("message").innerText = "Error claiming coupon.";
    }
});
