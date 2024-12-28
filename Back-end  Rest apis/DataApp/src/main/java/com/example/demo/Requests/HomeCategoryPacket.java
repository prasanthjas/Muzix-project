package com.example.demo.Requests;

import com.example.demo.Models.CMovie;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HomeCategoryPacket {
    private HomeCategory category;
    private List<CMovie> movies;
}
