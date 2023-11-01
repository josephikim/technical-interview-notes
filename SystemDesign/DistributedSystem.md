# Definition

A distributed system, also known as distributed computing, is a system with multiple components located on different machines that communicate and coordinate actions in order to appear as a single coherent system to the end-user.

# Overview

The machines that are a part of a distributed system may be computers, physical servers, virtual machines, containers, or any other node that can connect to the network, have local memory, and communicate by passing messages.

There are two general ways that distributed systems function:

1. Each machine works toward a common goal and the end-user views results as one cohesive unit.
2. Each machine has its own end-user and the distributed system facilitates sharing resources or communication services.

Although distributed systems can sometimes be obscure, they usually have three primary characteristics:

1. all components run concurrently
2. there is no global clock
3. all components fail independently of each other.

# Benefits and challenges of distributed systems

There are three reasons that teams generally decide to implement distributed systems:

## Horizontal Scalability

Since computing happens independently on each node, it is easy and generally inexpensive to add additional nodes and functionality as necessary.

## Reliability

Most distributed systems are fault-tolerant as they can be made up of hundreds of nodes that work together. The system generally doesn’t experience any disruptions if a single machine fails.

## Performance

Distributed systems are extremely efficient because work loads can be broken up and sent to multiple machines.
However, distributed systems are not without challenges. Complex architectural design, construction, and debugging processes that are required to create an effective distributed system can be overwhelming.

Three more challenges you may encounter include:

## Scheduling

A distributed system has to decide which jobs need to run, when they should run, and where they should run. Schedulers ultimately have limitations, leading to underutilized hardware and unpredictable runtimes.

## Latency

The more widely your system is distributed, the more latency you can experience with communications. This often leads to teams making trade-offs between

1. availability
2. consistency
3. latency (communication errors)

## Observability

Gathering, processing, presenting, and monitoring hardware usage metrics for large clusters is a significant challenge.
How a Distributed System Works
Hardware and software architectures are used to maintain a distributed system. Everything must be interconnected—CPUs via the network and processes via the communication system.

# Types of distributed systems

Distributed systems generally fall into one of four different basic architecture models:

## Client-server

Clients contact the server for data, then format it and display it to the end-user. The end-user can also make a change from the client-side and commit it back to the server to make it permanent.

## Three-tier

Information about the client is stored in a middle tier rather than on the client to simplify application deployment. This architecture model is most common for web applications.

## n-tier

Generally used when an application or server needs to forward requests to additional enterprise services on the network.

## Peer-to-peer

There are no additional machines used to provide services or manage resources. Responsibilities are uniformly distributed among machines in the system, known as peers, which can serve as either client or server.

# Example of a Distributed System

Distributed systems have endless use cases, a few being electronic banking systems, massive multiplayer online games, and sensor networks.

StackPath utilizes a particularly large distributed system to power its content delivery network service. Every one of our points of presence (PoPs) has nodes that form a worldwide distributed system. And to provide top notch content delivery, StackPath stores the most recently and frequently requested content in edge locations closest to the location it is being used.

Distributed systems at the edge

With StackPath’s edge-compute services, virtual machines, and containers, users can create their own distributed systems. By interconnecting VMs and containers, while also leveraging the speed and agility that comes with edge computing, your system can handle thousands of simultaneous requests at lightning-fast speed.

# Key Takeaways

1. Distributed systems can be made up of any machine capable of connecting to a network, having local memory, and communicating by passing messages.
2. By spreading out requests and workloads, distributed systems can support far more requests and compute jobs than a standard single system.
3. You can create your own lightning-fast distributed system by interconnecting StackPath’s edge computing containers and virtual machines.
