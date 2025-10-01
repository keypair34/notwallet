//
//  WalletView.swift
//  NotWallet Watch App
//
//  Created by Seto Elkahfi on 2025-07-14.
//

import Combine
import SwiftUI
import WalletKitV3

struct WalletView: View {

    init(
        viewModel: WalletView.ViewModel,
        onResetWallet: @escaping () -> Void
    ) {
        self.viewModel = viewModel
        self.onResetWallet = onResetWallet
    }

    var body: some View {
        NavigationStack {
            ScrollView {
                switch viewModel.state {
                case .loading:
                    ProgressView().frame(alignment: .center)
                case .idle:
                    Color.clear.onAppear(perform: {
                        Task {
                            await viewModel.walletBalance()
                        }
                    })
                case .loaded(let balance, let assetPrice):
                    Button(action: {
                        viewModel.showWalletBalance = true
                    }) {
                        VStack {
                            HStack(alignment: .center) {
                                Text(balance)
                                    .font(.system(size: 32, weight: .bold, design: .rounded))
                                    .foregroundColor(.purple)
                                Image(systemName: "arrow.right")
                            }
                            Text("Price: \(assetPrice)")
                                .font(.system(size: 32, weight: .bold, design: .rounded))
                                .foregroundColor(.purple)
                        }
                    }
                    .buttonStyle(.plain)
                case .failed(let error):
                    VStack {
                        Text("N/A")
                            .font(.system(size: 32, weight: .bold, design: .rounded))
                            .foregroundColor(.purple)
                        Text(error.localizedDescription)
                            .font(.system(size: 16, weight: .regular, design: .rounded))
                            .foregroundColor(.red)
                    }
                }

                Divider()

                // Wallet Selection Section
                VStack(spacing: 12) {
                    Text("SELECTED WALLET")
                        .font(.system(size: 16, weight: .regular, design: .rounded))
                        .foregroundColor(.primary)
                        .tracking(0.8)

                    Text(viewModel.activeKeyPair.initial())
                        .font(.system(size: 18, weight: .regular, design: .rounded))
                        .foregroundColor(.purple)
                        .tracking(0.8)

                    Button(action: { viewModel.showQrCode = true }) {
                        Text(viewModel.activeKeyPair.name)
                            .font(.system(size: 18, weight: .medium, design: .rounded))
                            .foregroundColor(.primary)
                            .padding(.horizontal, 16)
                            .padding(.vertical, 10)
                            .background(
                                RoundedRectangle(cornerRadius: 8)
                                    .fill(Color(.purple))
                            )
                    }
                    .buttonStyle(.plain)
                }

                Divider()

                NavigationLink(
                    destination: WalletSettingView(
                        viewModel: .init(
                            activeKeyPair: viewModel.activeKeyPair,
                            onActiveKeyPairChanged: viewModel.onActiveKeyPairChanged(wallet:)
                        )
                    )
                ) {
                    HStack {
                        Image(systemName: "gear")
                        Text("Settings")
                            .font(.system(size: 18, weight: .medium, design: .rounded))
                            .foregroundColor(.primary)
                            .frame(height: 24)

                        Spacer()
                    }
                    .padding(.horizontal, 16)
                    .padding(.vertical, 12)
                    .background(
                        RoundedRectangle(cornerRadius: 8)
                            .fill(Color(.darkGray).opacity(0.6))
                    )
                }
                .buttonStyle(.plain)

                Button(action: {
                    viewModel.confirmResetWallet = true
                }) {
                    HStack {

                        Image(systemName: "clear.fill")

                        Text("Reset Wallet")
                            .font(.system(size: 18, weight: .medium, design: .rounded))
                            .foregroundColor(.red)
                            .frame(height: 24)

                        Spacer()
                    }
                    .padding(.horizontal, 16)
                    .padding(.vertical, 12)
                    .background(
                        RoundedRectangle(cornerRadius: 8)
                            .fill(Color(.darkGray).opacity(0.6))
                    )
                }
                .buttonStyle(.plain)
            }
            .sheet(isPresented: $viewModel.showQrCode) {
                QRCodeView(
                    viewModel: .init(activeKeyPair: viewModel.activeKeyPair)
                )
            }
            .sheet(isPresented: $viewModel.showWalletInfo) {
                WalletInfoView(viewModel: .init())
            }
            .sheet(isPresented: $viewModel.confirmResetWallet) {
                ConfirmResetWalletView(onResetWallet: onResetWallet)
            }
            .sheet(isPresented: $viewModel.showWalletBalance) {
                WalletBalanceView(
                    viewModel: .init(
                        activeKeyPair: viewModel.activeKeyPair
                    ),
                    onResetWallet: onResetWallet
                )
            }
            .onAppear {
                viewModel.onAppear()
            }
        }
    }

    // MARK: - Private

    @ObservedObject private var viewModel: ViewModel
    private let onResetWallet: () -> Void
}

extension WalletView {
    final class ViewModel: ObservableObject {
        internal init(state: ViewState = ViewState.idle, activeKeyPair: Wallet) {
            self.state = state
            self.activeKeyPair = activeKeyPair
        }

        enum ViewState {
            case idle
            case loading
            case failed(Error)
            case loaded(String, Double)
        }

        enum OnboardingState {
            case done, new
        }

        @Published private(set) var state = ViewState.idle
        @Published private(set) var activeKeyPair: Wallet

        @Published var showQrCode = false
        @Published var showWalletInfo = false
        @Published var showWalletBalance = false
        @Published var confirmResetWallet = false

        func onAppear() {
            state = .idle
        }

        @MainActor
        func walletBalance() async {
            do {
                state = .loading
                print("🐦🐦  Will load balance.")
                // TODO: - CHANGE ME ON RELEASE
                /*
                let balance = try await WalletKitV3.walletBalance(
                    network: .solanaMainnet,
                    pubkey: activeKeyPair.pubkey
                )
                let assetPrice = try await WalletKitV3.assetPrice(asset: "CTQBjyrX8pYyqbNa8vAhQfnRXfu9cUxnvrxj5PvbzTmf")
                 */
                let assetPrice = try await getAssetPrice(asset: "CTQBjyrX8pYyqbNa8vAhQfnRXfu9cUxnvrxj5PvbzTmf")
                
                state = .loaded("N/A", assetPrice)
            } catch {
                state = .failed(error)
            }
        }
        
        func onActiveKeyPairChanged(wallet: Wallet) {
            activeKeyPair = wallet
        }
        
        func getAssetPrice(asset: String) async throws -> Double {
            /// Configure the URL for our request.
            /// In this case, an example JSON response from httpbin.
            let url = URL(string: "https://public-api.birdeye.so/defi/price?address=\(asset)")!
            
            /// Create a URLRequest for the POST request.
            var request = URLRequest(url: url)
            
            /// Configure the HTTP method.
            request.httpMethod = "GET"

            /// Configure the proper content-type value to JSON.
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            
            /// Configure BirdEye header
            request.setValue("4f1d6617474442d299bfa3cbc5436fd9", forHTTPHeaderField: "X-API-KEY")
            
            /// Use URLSession to fetch the data asynchronously.
            let (data, _) = try await URLSession.shared.data(for: request)
            
            /// Decode the JSON response into the PostResponse struct.
            let decodedResponse = try JSONDecoder().decode(BirdeyePriceResponse.self, from: data)

            print("The JSON response contains a name: \(decodedResponse.success) and an age: \(decodedResponse.data)")
            
            return decodedResponse.data.value
        }
    }
}

#Preview {
    WalletView(
        viewModel: .init(
            activeKeyPair: .init(
                id: "",
                username: nil,
                name: "WalletName",
                account: 0,
                pubkey: "EjEYahpsv5AADKHdv32wknbq59tsqZPDZJgyMpZ5qhnV",
                privkey: "",
                seedId: ""
            )
        ),
        onResetWallet: {}
    )
}
