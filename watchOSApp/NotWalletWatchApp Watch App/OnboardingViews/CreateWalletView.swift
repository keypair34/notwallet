//
//  CreateWalletView.swift
//  NotWalletWatchApp
//
//  Created by Seto Elkahfi on 2025-09-15.
//

import Combine
import SwiftUI
import WalletKitV3

struct CreateWalletView: View {
    
    init(viewModel: ViewModel, isLoading: Bool = true, isError: Bool = false, isAcceptedToc: Bool = false, shouldContinue: Bool = false) {
        self.viewModel = viewModel
        self.isLoading = isLoading
        self.isError = isError
        self.isAcceptedToc = isAcceptedToc
        self.shouldContinue = shouldContinue
    }

    var body: some View {
        if isLoading {
            ProgressView("Crunching numbers...")
                .onAppear {
                    do {
                        try viewModel.initialize()
                        isLoading = false
                    } catch {
                        isError = true
                    }
                }
        } else if isError {
            Text("Something wrong")
        } else if let wallet = viewModel.wallet {
            ScrollView {
                VStack(spacing: 12) {
                    Text("Seed Phrase")
                        .font(.system(size: 24, weight: .bold, design: .rounded))
                        .foregroundColor(.purple)
                    Text(wallet.seed)
                        .font(.system(size: 18, weight: .regular, design: .rounded))
                        .foregroundColor(.primary)
                    
                    Divider()
                    Text("I have written them down somewhere and fully responsible of my funds.")
                        .font(.system(size: 12, weight: .regular, design: .rounded))
                        .foregroundColor(.red)
                    
                    Toggle("I understand", isOn: $isAcceptedToc).font(.system(size: 12, weight: .regular, design: .rounded))
                    
                    Button(action: { shouldContinue = true }) {
                        Text("Continue")
                            .foregroundColor(.primary)
                            .padding(.vertical, 6)
                            .frame(height: 18)
                            .clipShape(Rectangle())
                            .contentShape(Rectangle())
                    }
                    .buttonStyle(.bordered)
                    .frame(maxWidth: .infinity)
                }
                .toggleStyle(.automatic)
                .padding()
            }
        }
    }
    
    // MARK: - Private
    
    private let viewModel: ViewModel
    
    @State private var isLoading: Bool
    @State private var isError: Bool
    @State private var isAcceptedToc: Bool
    @State private var shouldContinue: Bool
}

extension CreateWalletView {
    final class ViewModel {
        var wallet: Wallet?
        
        func initialize() throws {
            wallet = try createWallet()
            userDefault.set(wallet, forKey: storage(key: .keyPairs))
        }
        
        // MARK: - Private
        
        private let userDefault = UserDefaults.standard
    }
}

#Preview {
    CreateWalletView(viewModel: .init())
}
