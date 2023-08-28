import random
import math
import numpy as np

# Modify these parameters to change how the Gini index evolves w/ time.
exchangeRate = 0.01224 # high exchange => low inequality. This is the MEAN exchange rate. 
exchangeDifference = 0.0112 # captures the difference in exchange rates between a wealthy and a poor actor
meanInterest = 0.0000
sigmaInterest = 0.0000 # high sigma interest => high inequality

def random_interest(agent):
    return random.gauss(meanInterest, sigmaInterest)

agents = []

class Agent:    
    def __init__(self, wealth):
        self.neighbors = []
        self.wealth = wealth
        self.nextTickIncome = 0
        self.name = ""

        agents.append(self)

    def totalNeighborWealth(self): # simple sum of the wealth of all an agent's neighbors
        total_wealth = 0
        for neighbor in self.neighbors:
            total_wealth += neighbor.wealth
        return total_wealth
    
    def JProfit(self): # sum of J[i][j] * W_j - the profit of actor i in Bouchaud (2000)
        total_profit = 0
        for neighbor in self.neighbors:
            total_profit += J[agents.index(self)][agents.index(neighbor)] * neighbor.wealth
        return total_profit

    def JLoss(self): # sum of J[j][i] * W_i 
        total_loss = 0
        for neighbor in self.neighbors:
            total_loss += J[agents.index(neighbor)][agents.index(self)]
        total_loss *= self.wealth
        return total_loss
    
    def find_name(self):
        return [name for name, value in globals().items() if value is self][0]
    
def addLink(agent1, agent2): # original links
    agent1.neighbors.append(agent2)
    agent2.neighbors.append(agent1)

    if agent1.wealth > agent2.wealth:
        J[agents.index(agent1)][agents.index(agent2)] = exchangeRate + exchangeDifference
        J[agents.index(agent2)][agents.index(agent1)] = exchangeRate - exchangeDifference
    elif agent1.wealth < agent2.wealth:
        J[agents.index(agent1)][agents.index(agent2)] = exchangeRate - exchangeDifference
        J[agents.index(agent2)][agents.index(agent1)] = exchangeRate + exchangeDifference
    else:
        J[agents.index(agent1)][agents.index(agent2)] = exchangeRate
        J[agents.index(agent2)][agents.index(agent1)] = exchangeRate

def addNewLink(agent1, agent2): # new links
    agent1.neighbors.append(agent2)
    agent2.neighbors.append(agent1)

    if agent1.wealth < agent2.wealth:
        J[agents.index(agent1)][agents.index(agent2)] = exchangeRate + exchangeDifference
        J[agents.index(agent2)][agents.index(agent1)] = exchangeRate - exchangeDifference
    elif agent1.wealth > agent2.wealth:
        J[agents.index(agent1)][agents.index(agent2)] = exchangeRate - exchangeDifference
        J[agents.index(agent2)][agents.index(agent1)] = exchangeRate + exchangeDifference
    else:
        J[agents.index(agent1)][agents.index(agent2)] = exchangeRate
        J[agents.index(agent2)][agents.index(agent1)] = exchangeRate

def gini_coefficient():
    wealths = [agent.wealth for agent in agents]
    n = len(wealths)
    sum_of_absolute_differences = sum(abs(x_i - x_j) for x_i in wealths for x_j in wealths)
    mean_wealth = sum(wealths) / n
    return sum_of_absolute_differences / (2 * n**2 * mean_wealth)

# region Agent initialization
Myriel = Agent(100)
Napoleon = Agent(100)
MlleBaptistine = Agent(100)
MmeMagloire = Agent(100)
CountessdeLo = Agent(100)
Geborand = Agent(100)
Champtercier = Agent(100)
Cravatte = Agent(100)
Count = Agent(100)
OldMan = Agent(100)
Labarre = Agent(200)
Valjean = Agent(200)
Marguerite = Agent(300)
MmedeR = Agent(200)
Isabeau = Agent(200)
Gervais = Agent(200)
Tholomyes = Agent(300)
Listolier = Agent(300)
Fameuil = Agent(300)
Blacheville = Agent(300)
Favourite = Agent(300)
Dahlia = Agent(300)
Zephine = Agent(300)
Fantine = Agent(300)
MmeThenardier = Agent(400)
Thenardier = Agent(400)
Cosette = Agent(500)
Javert = Agent(400)
Fauchelevent = Agent(0)
Bamatabois = Agent(200)
Perpetue = Agent(300)
Simplice = Agent(200)
Scaufflaire = Agent(200)
Woman1 = Agent(200)
Judge = Agent(200)
Champmathieu = Agent(200)
Brevet = Agent(200)
Chenildieu = Agent(200)
Cochepaille = Agent(200)
Pontmercy = Agent(400)
Boulatruelle = Agent(400)
Eponine = Agent(400)
Anzelma = Agent(400)
Woman2 = Agent(500)
MotherInnocent = Agent(0)
Gribier = Agent(0)
Jondrette = Agent(700)
MmeBurgon = Agent(700)
Gavroche = Agent(800)
Gillenormand = Agent(500)
Magnon = Agent(500)
MlleGillenormand = Agent(500)
MmePontmercy = Agent(500)
MlleVaubois = Agent(500)
LtGillenormand = Agent(500)
Marius = Agent(800)
BaronessT = Agent(500)
Mabeuf = Agent(800)
Enjolras = Agent(800)
Combeferre = Agent(800)
Prouvaire = Agent(800)
Feuilly = Agent(800)
Courfeyrac = Agent(800)
Bahorel = Agent(800)
Bossuet = Agent(800)
Joly = Agent(800)
Grantaire = Agent(800)
MotherPlutarch = Agent(800)
Gueulemer = Agent(400)
Babet = Agent(400)
Claquesous = Agent(400)
Montparnasse = Agent(400)
Toussaint = Agent(500)
Child1 = Agent(700)
Child2 = Agent(700)
Brujon = Agent(400)
MmeHucheloup = Agent(800)
# endregion

J = np.zeros((len(agents), len(agents))) # initialize exchange matrix - do this before links added and after agents initialized

for agent in agents:
    agent.name = agent.find_name()

def generate_pareto_values(alpha, xm, n):
    values = []
    for i in range(1, n+1):
        # Calculate the percentile for this index
        p = i / (n + 1)
        
        # Apply the inverse CDF
        x = xm / math.pow(1 - p, 1/alpha)
        
        values.append(x)
    return values

def set_wealth_to_pareto(agents, alpha=0.8, xm=10):
    initial_wealths = generate_pareto_values(alpha, xm, len(agents))
    
    # Shallow copy and shuffle
    shuffled_wealths = random.sample(initial_wealths, len(initial_wealths))
    
    for agent, wealth in zip(agents, shuffled_wealths):
        agent.wealth = wealth

set_wealth_to_pareto(agents)

# region Link initialization
addLink(Napoleon, Myriel)
addLink(MlleBaptistine, Myriel)
addLink(MlleBaptistine, Tholomyes)
addLink(MmeMagloire, Myriel)
addLink(MmeMagloire, MlleBaptistine)
addLink(CountessdeLo, Myriel)
addLink(Geborand, Myriel)
addLink(Champtercier, Myriel)
addLink(Cravatte, Myriel)
addLink(Count, Myriel)
addLink(OldMan, Myriel)
addLink(Valjean, Labarre)
addLink(Valjean, MmeMagloire)
addLink(Valjean, MlleBaptistine)
addLink(Valjean, Myriel)
addLink(Marguerite, Valjean)
addLink(MmedeR, Valjean)
addLink(Isabeau, Valjean)
addLink(Gervais, Valjean)
addLink(Listolier, Tholomyes)
addLink(Fameuil, Tholomyes)
addLink(Fameuil, Listolier)
addLink(Blacheville, Tholomyes)
addLink(Blacheville, Listolier)
addLink(Blacheville, Fameuil)
addLink(Favourite, Tholomyes)
addLink(Favourite, Listolier)
addLink(Favourite, Fameuil)
addLink(Favourite, Blacheville)
addLink(Dahlia, Tholomyes)
addLink(Dahlia, Listolier)
addLink(Dahlia, Fameuil)
addLink(Dahlia, Blacheville)
addLink(Dahlia, Favourite)
addLink(Zephine, Tholomyes)
addLink(Zephine, Listolier)
addLink(Zephine, Fameuil)
addLink(Zephine, Blacheville)
addLink(Zephine, Favourite)
addLink(Zephine, Dahlia)
addLink(Fantine, Tholomyes)
addLink(Fantine, Listolier)
addLink(Fantine, Fameuil)
addLink(Fantine, Blacheville)
addLink(Fantine, Favourite)
addLink(Fantine, Dahlia)
addLink(Fantine, Zephine)
addLink(Fantine, Marguerite)
addLink(Fantine, Valjean)
addLink(MmeThenardier, Fantine)
addLink(MmeThenardier, Valjean)
addLink(Thenardier, MmeThenardier)
addLink(Thenardier, Fantine)
addLink(Thenardier, Valjean)
addLink(Cosette, MmeThenardier)
addLink(Cosette, Valjean)
addLink(Cosette, Tholomyes)
addLink(Cosette, Thenardier)
addLink(Javert, Valjean)
addLink(Javert, Fantine)
addLink(Javert, Thenardier)
addLink(Javert, MmeThenardier)
addLink(Javert, Cosette)
addLink(Fauchelevent, Valjean)
addLink(Fauchelevent, Javert)
addLink(Bamatabois, Fantine)
addLink(Bamatabois, Javert)
addLink(Bamatabois, Valjean)
addLink(Perpetue, Fantine)
addLink(Simplice, Perpetue)
addLink(Simplice, Valjean)
addLink(Simplice, Fantine)
addLink(Simplice, Javert)
addLink(Scaufflaire, Valjean)
addLink(Woman1, Valjean)
addLink(Woman1, Javert)
addLink(Judge, Valjean)
addLink(Judge, Bamatabois)
addLink(Champmathieu, Valjean)
addLink(Champmathieu, Judge)
addLink(Champmathieu, Bamatabois)
addLink(Brevet, Judge)
addLink(Brevet, Champmathieu)
addLink(Brevet, Valjean)
addLink(Brevet, Bamatabois)
addLink(Chenildieu, Judge)
addLink(Chenildieu, Champmathieu)
addLink(Chenildieu, Brevet)
addLink(Chenildieu, Valjean)
addLink(Chenildieu, Bamatabois)
addLink(Cochepaille, Judge)
addLink(Cochepaille, Champmathieu)
addLink(Cochepaille, Brevet)
addLink(Cochepaille, Chenildieu)
addLink(Cochepaille, Valjean)
addLink(Cochepaille, Bamatabois)
addLink(Pontmercy, Thenardier)
addLink(Boulatruelle, Thenardier)
addLink(Eponine, MmeThenardier)
addLink(Eponine, Thenardier)
addLink(Anzelma, Eponine)
addLink(Anzelma, Thenardier)
addLink(Anzelma, MmeThenardier)
addLink(Woman2, Valjean)
addLink(Woman2, Cosette)
addLink(Woman2, Javert)
addLink(MotherInnocent, Fauchelevent)
addLink(MotherInnocent, Valjean)
addLink(Gribier, Fauchelevent)
addLink(MmeBurgon, Jondrette)
addLink(Gavroche, MmeBurgon)
addLink(Gavroche, Thenardier)
addLink(Gavroche, Javert)
addLink(Gavroche, Valjean)
addLink(Gillenormand, Cosette)
addLink(Gillenormand, Valjean)
addLink(Magnon, Gillenormand)
addLink(Magnon, MmeThenardier)
addLink(MlleGillenormand, Gillenormand)
addLink(MlleGillenormand, Cosette)
addLink(MlleGillenormand, Valjean)
addLink(MmePontmercy, MlleGillenormand)
addLink(MmePontmercy, Pontmercy)
addLink(MlleVaubois, MlleGillenormand)
addLink(LtGillenormand, MlleGillenormand)
addLink(LtGillenormand, Gillenormand)
addLink(LtGillenormand, Cosette)
addLink(Marius, MlleGillenormand)
addLink(Marius, Gillenormand)
addLink(Marius, Pontmercy)
addLink(Marius, LtGillenormand)
addLink(Marius, Cosette)
addLink(Marius, Valjean)
addLink(Marius, Tholomyes)
addLink(Marius, Thenardier)
addLink(Marius, Eponine)
addLink(Marius, Gavroche)
addLink(BaronessT, Gillenormand)
addLink(BaronessT, Marius)
addLink(Mabeuf, Marius)
addLink(Mabeuf, Eponine)
addLink(Mabeuf, Gavroche)
addLink(Enjolras, Marius)
addLink(Enjolras, Gavroche)
addLink(Enjolras, Javert)
addLink(Enjolras, Mabeuf)
addLink(Enjolras, Valjean)
addLink(Combeferre, Enjolras)
addLink(Combeferre, Marius)
addLink(Combeferre, Gavroche)
addLink(Combeferre, Mabeuf)
addLink(Prouvaire, Gavroche)
addLink(Prouvaire, Enjolras)
addLink(Prouvaire, Combeferre)
addLink(Feuilly, Gavroche)
addLink(Feuilly, Enjolras)
addLink(Feuilly, Prouvaire)
addLink(Feuilly, Combeferre)
addLink(Feuilly, Mabeuf)
addLink(Feuilly, Marius)
addLink(Courfeyrac, Marius)
addLink(Courfeyrac, Enjolras)
addLink(Courfeyrac, Combeferre)
addLink(Courfeyrac, Gavroche)
addLink(Courfeyrac, Mabeuf)
addLink(Courfeyrac, Eponine)
addLink(Courfeyrac, Feuilly)
addLink(Courfeyrac, Prouvaire)
addLink(Bahorel, Combeferre)
addLink(Bahorel, Gavroche)
addLink(Bahorel, Courfeyrac)
addLink(Bahorel, Mabeuf)
addLink(Bahorel, Enjolras)
addLink(Bahorel, Feuilly)
addLink(Bahorel, Prouvaire)
addLink(Bahorel, Marius)
addLink(Bossuet, Marius)
addLink(Bossuet, Courfeyrac)
addLink(Bossuet, Gavroche)
addLink(Bossuet, Bahorel)
addLink(Bossuet, Enjolras)
addLink(Bossuet, Feuilly)
addLink(Bossuet, Prouvaire)
addLink(Bossuet, Combeferre)
addLink(Bossuet, Mabeuf)
addLink(Bossuet, Valjean)
addLink(Joly, Bahorel)
addLink(Joly, Bossuet)
addLink(Joly, Gavroche)
addLink(Joly, Courfeyrac)
addLink(Joly, Enjolras)
addLink(Joly, Feuilly)
addLink(Joly, Prouvaire)
addLink(Joly, Combeferre)
addLink(Joly, Mabeuf)
addLink(Joly, Marius)
addLink(Grantaire, Bossuet)
addLink(Grantaire, Enjolras)
addLink(Grantaire, Combeferre)
addLink(Grantaire, Courfeyrac)
addLink(Grantaire, Joly)
addLink(Grantaire, Gavroche)
addLink(Grantaire, Bahorel)
addLink(Grantaire, Feuilly)
addLink(Grantaire, Prouvaire)
addLink(MotherPlutarch, Mabeuf)
addLink(Gueulemer, Thenardier)
addLink(Gueulemer, Valjean)
addLink(Gueulemer, MmeThenardier)
addLink(Gueulemer, Javert)
addLink(Gueulemer, Gavroche)
addLink(Gueulemer, Eponine)
addLink(Babet, Thenardier)
addLink(Babet, Gueulemer)
addLink(Babet, Valjean)
addLink(Babet, MmeThenardier)
addLink(Babet, Javert)
addLink(Babet, Gavroche)
addLink(Babet, Eponine)
addLink(Claquesous, Thenardier)
addLink(Claquesous, Babet)
addLink(Claquesous, Gueulemer)
addLink(Claquesous, Valjean)
addLink(Claquesous, MmeThenardier)
addLink(Claquesous, Javert)
addLink(Claquesous, Eponine)
addLink(Claquesous, Enjolras)
addLink(Montparnasse, Javert)
addLink(Montparnasse, Babet)
addLink(Montparnasse, Gueulemer)
addLink(Montparnasse, Claquesous)
addLink(Montparnasse, Valjean)
addLink(Montparnasse, Gavroche)
addLink(Montparnasse, Eponine)
addLink(Montparnasse, Thenardier)
addLink(Toussaint, Cosette)
addLink(Toussaint, Javert)
addLink(Toussaint, Valjean)
addLink(Child1, Gavroche)
addLink(Child2, Gavroche)
addLink(Child2, Child1)
addLink(Brujon, Babet)
addLink(Brujon, Gueulemer)
addLink(Brujon, Thenardier)
addLink(Brujon, Gavroche)
addLink(Brujon, Eponine)
addLink(Brujon, Claquesous)
addLink(Brujon, Montparnasse)
addLink(MmeHucheloup, Bossuet)
addLink(MmeHucheloup, Joly)
addLink(MmeHucheloup, Grantaire)
addLink(MmeHucheloup, Bahorel)
addLink(MmeHucheloup, Courfeyrac)
addLink(MmeHucheloup, Gavroche)
addLink(MmeHucheloup, Enjolras)
addLink(Gribier, MotherInnocent)
addLink(MlleVaubois, BaronessT)
addLink(Child1, MmeBurgon)
addLink(Child2, MmeBurgon)
addLink(Child2, Jondrette)
addLink(Child1, Jondrette)
addLink(MmedeR, Chenildieu)
addLink(MmedeR, Bamatabois)
addLink(Scaufflaire, Champmathieu)
addLink(MotherPlutarch, Marius)
addLink(Simplice, Gervais)
addLink(Labarre, Gervais)
addLink(Isabeau, Bamatabois)
addLink(Scaufflaire, Judge)
addLink(Gervais, Bamatabois)
addLink(MmePontmercy, MlleVaubois)
addLink(Toussaint, MlleVaubois)
addLink(Brevet, Isabeau)
addLink(Pontmercy, Anzelma)
addLink(Simplice, MmedeR)
addLink(Isabeau, Scaufflaire)
addLink(Brevet, Isabeau)
addLink(Labarre, Judge)
# endregion

def gameLoop():
    #outputString = ""
    #for agent in agents:
    #    outputString += agent.name + ": " + str(round(agent.wealth)) + " "
    #print(outputString)

    for agent in agents:
        agent.nextTickIncome = random_interest(agent) * agent.wealth + agent.JProfit() - agent.JLoss()
    for agent in agents:
        agent.wealth += agent.nextTickIncome

def total_wealth():
    return sum(agent.wealth for agent in agents)

print(gini_coefficient())
for i in range(3650):
    gameLoop()

#addLink(Myriel, Gavroche) # entropy-decreasing link

for i in range(0):
    gameLoop()

print(gini_coefficient())
print(J)