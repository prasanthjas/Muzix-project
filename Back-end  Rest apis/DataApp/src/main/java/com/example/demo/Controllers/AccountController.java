package com.example.demo.Controllers;

import com.example.demo.Models.AccountDetails;
import com.example.demo.Models.Watchlist;
import com.example.demo.Services.AccountService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/account")
@CrossOrigin(originPatterns = "*")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @Value("${rzpay.keyId}")
    private String rzpayKeyId;

    @Value("${rzpay.secret}")
    private String rzpaySecret;

    private Order orderCache;

    private void setOrderCache(Order order) {
        this.orderCache = order;
    }

    private Order getOrderCache() {
        return this.orderCache;
    }

    private void clearOrderCache() {
        this.orderCache = null;
    }

    @GetMapping
    public ResponseEntity<AccountDetails> getUserAccount(@RequestParam String username) throws Exception {
        AccountDetails account = accountService.getAccountByUsername(username);
        if (account == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        System.out.println(account);
        return ResponseEntity.ok(account);
    }

    @GetMapping("/add-account")
    public ResponseEntity<AccountDetails> addNewAccount(@RequestParam String username, @RequestParam String email) throws Exception {
        AccountDetails account = accountService.addAccount(username, email);

        if (account == null) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(null);
        }
        return ResponseEntity.ok(account);
    }

    @GetMapping("/add-watchlist")
    public ResponseEntity<AccountDetails> addWatchList(@RequestParam String username, @RequestParam String watchlistName) throws Exception {
        Watchlist watchlist = new Watchlist(watchlistName);
        AccountDetails account = accountService.addWatchlist(username, watchlist);
        return ResponseEntity.ok(account);
    }

    @GetMapping("/delete-watchlist")
    public ResponseEntity<AccountDetails> deleteWatchlist(@RequestParam String username, @RequestParam String watchlistName) throws Exception {
        AccountDetails account = accountService.deleteWatchlist(username, watchlistName);
        if (account == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(account);
    }

    @GetMapping("/add-movie")
    public ResponseEntity<AccountDetails> addMovieToWatchlist(@RequestParam String username, @RequestParam String watchlistname, @RequestParam int id) throws Exception {
        AccountDetails account = accountService.addMovieToWatchlist(username, watchlistname, id);
        return ResponseEntity.ok(account);
    }

    @GetMapping("/delete-movie")
    public ResponseEntity<AccountDetails> deleteMovieFromWatchList(@RequestParam String username, @RequestParam String watchlistname, @RequestParam int id) throws Exception {
        AccountDetails account = accountService.deleteMovieFromWatchlist(username, watchlistname, id);
        if (account == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(account);
    }

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder() {
        try {
            RazorpayClient client = new RazorpayClient(rzpayKeyId, rzpaySecret);

            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", 39900);
            orderRequest.put("currency", "INR");

            Order order = client.orders.create(orderRequest);
            setOrderCache(order);
            System.out.println(order);
            return ResponseEntity.ok(order.toString());
        } catch (RazorpayException e) {
            System.err.println("Error creating Razorpay order: " + e.getMessage());
            e.printStackTrace();

            return ResponseEntity.badRequest().body("Failed to create order: " + e.getMessage());
        }
    }


    @PostMapping("/authenticate-order")
    public ResponseEntity<?> subscribeToPaidService(@RequestParam String username, @RequestParam String paymentID, @RequestParam String orderID, @RequestParam String signature) throws RazorpayException {
        RazorpayClient client = new RazorpayClient(rzpayKeyId, rzpaySecret);

        if (orderCache.get("id").toString().equals(orderID)) {
            JSONObject options = new JSONObject();
            options.put("razorpay_order_id", orderID);
            options.put("razorpay_payment_id", paymentID);
            options.put("razorpay_signature", signature);

            Boolean status = Utils.verifyPaymentSignature(options, rzpaySecret);
            System.out.println(status);

            if (status) {
                System.out.println("Payment Successful");
                accountService.updateSubscriptionStatusToPaid(username);
                return ResponseEntity.ok().body("Order Successful");
            } else {
                System.out.println("payment unsuccessful");
                return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(null);
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    @GetMapping("/cancel-subscription")
    public ResponseEntity<?> cancelSubscription(@RequestParam String username) {
        return ResponseEntity.ok().body(accountService.cancelPaidSubscription(username));
    }
}

