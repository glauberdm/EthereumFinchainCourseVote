App = {
    web3Provider: null,
    contracts: {},

    init: () => {
        return App.initWeb3();
    },

    initWeb3: () => {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
        } else {
            App.web3Provider = new web3.providers.HttpProvider('http://localhost:8545');
            web3 = new Web3(App.web3Provider);
        }

        return App.initContract();
    },

    initContract: () => {
        $.getJSON('ColorDecision.json', (data) => {
            var ColorDecisionArtifact = data;
            App.contracts.ColorDecision = TruffleContract(ColorDecisionArtifact);
            App.contracts.ColorDecision.setProvider(App.web3Provider);

            return App.showProposals();
        });

        return App.bindEvents();
    },

    bindEvents: function () {
        $(document).on('click', '.btn-send', App.handleSend);
        $(document).on('click', '.btn-winner', App.handleWinner);
        $(document).on('click', '.btn-to-vote', App.handleToVote);
    },

    isEmpty: (string) => {
        return !string || 0 === string.length;
    },

    handleSend: function () {
        var color = event.target.id

        if (confirm(`Are you sure you want to vote in ${color.toUpperCase()} color?`)) {
            console.log('EVENT', event)
            console.log('EVENT TARGET', event.target)
            console.log('PROPOSALR BUTTONS', $('.proposal'))
            var proposals = $('.proposal')
            var proposal = null;

            for (let i = 0; proposals.length; i++) {
                if (proposals[i] === event.target) {
                    proposal = i
                    break
                }
            }

            console.log('PROPOSAL INDEX ', proposal)

            event.preventDefault();

            var outputMessage = $('.output-message');

            var contractInstance;

            App.contracts.ColorDecision.deployed()
                .then(function (instance) {

                    contractInstance = instance;

                    return contractInstance.vote(proposal);
                }).then(function (result) {
                    if (result) {
                        outputMessage.css('color', color).text(`Congrants! You voted in ${color.toUpperCase()}!`);
                    }
                }).catch(function (err) {
                    console.log(err);
                    outputMessage.text(err.message);
                });
        }
    },

    handleToVote: () => {
        var addressTo = $('.addressTo').val()

        if (App.isEmpty(addressTo)) {
            alert("Address is empty!")
            return
        }

        if (confirm(`Are you sure you want to give right vote to "${addressTo}"?`)) {
            var contractInstance;
            var outputToVote = $('.output-to-vote');

            App.contracts.ColorDecision.deployed()
                .then((instance) => {

                    contractInstance = instance;

                    return contractInstance.giveRightToVote(addressTo);
                }).then((result) => {
                    if (result) {
                        outputToVote.text('OK!')
                    } else {
                        outputToVote.text('Fail!')
                    }
                })
                .catch((err) => {
                    console.log(err);
                    outputToVote.text(err.message);
                });
        }
    },

    handleWinner: () => {
        var outputWinner = $('.output-winner');

        App.contracts.ColorDecision.deployed()
            .then((instance) => {

                contractInstance = instance;

                return contractInstance.hasVotes();
            }).then((hasVotes) => {
                if (hasVotes) {
                    return contractInstance.winnerName()
                        .then((colorWinner) => {
                            colorWinner = web3.toAscii(colorWinner).replace(/\u0000/g, '')
                            outputWinner.css('color', colorWinner).text(`${colorWinner.toUpperCase()} is winner!`);
                            let winnerHtml = `<span></span><button style="background-color:${colorWinner}; height:200px;width:200px;" class="btn btn-default btn-send proposal" id="${colorWinner}" name="${colorWinner}" type="button">${colorWinner.toUpperCase()}</button>`
                            $('.winner').html(winnerHtml)
                        });
                } else {
                    outputWinner.css('color', 'black').text(`No has votes!`);
                }
            })
            .catch((err) => {
                console.log(err);
                outputWinner.text(err.message);
            });
    },

    showAddress: (account) => {
        $('.wallet-address').text(account);
    },

    createProposals: () => {
        var contractInstance;

        App.contracts.ColorDecision.deployed()
            .then(
                (instance) => {
                    contractInstance = instance;

                    return contractInstance.proposalsLength();
                }
            ).then(
                (proposalsLength) => {
                    var colorsHtml = ""
                    for (let proposalIndex = 0; proposalIndex < proposalsLength; proposalIndex++) {
                        contractInstance.proposals(proposalIndex)
                            .then(
                                (proposal) => {
                                    let color = web3.toAscii(proposal[0]).replace(/\u0000/g, '')
                                    let votes = proposal[1]
                                    let colorHtml = `<span></span><button style="background-color:${color}; height:200px;width:200px;" class="btn btn-default btn-send proposal" id="${color}" name="${color}" type="button">${color.toUpperCase()}</button>`
                                    colorsHtml += colorHtml
                                    $('.proposals').html(colorsHtml);
                                }
                            )
                    }
                }
            ).catch((err) => {
                console.log(err.message);
            });
    },

    showProposals: () => {
        var account = web3.eth.accounts[0];

        App.showAddress(account);
        App.createProposals();
    }
};

$(
    () => {
        $(window).load(() => {
            App.init();
        });
    }
);