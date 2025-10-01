//
//  BirdeyePriceData.swift
//  NotWalletWatchApp
//
//  Created by Seto Elkahfi on 2025-10-01.
//

struct BirdeyePriceData {
   let isScaledUiToken: Bool
   let value: Float64
   let updateUnixTime: Int64
   let updateHumanTime: String
   let priceChange24h: Float64
   let priceInNative: Float64
}

extension BirdeyePriceData: Decodable {
    
}
