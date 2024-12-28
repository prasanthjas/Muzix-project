package com.example.demo.Services;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Random;

@Service
public class OtpService {

    private HashMap<String, Integer> OtpStore;

    public OtpService() {
        this.OtpStore = new HashMap<>();
    }

    public int generateOtp(String email) {
        Random rand = new Random();
        int OTP = rand.nextInt(100000);
        OtpStore.put(email, OTP);
        return OTP;
    }

    public Boolean checkOtp(String email, int otp) {
        int storedOtp = OtpStore.get(email);
        if(storedOtp == otp) {
            return true;
        } else {
            return false;
        }
    }

    public void revokeOtp(String email) {
        OtpStore.remove(email);
    }
}
