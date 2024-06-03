# Frontend Benchmark - TDP

## Overview

This repository contains a comprehensive benchmark comparison of four popular frontend frameworks: Next.js, Nuxt, Angular, and Svelte. The benchmark evaluates the performance of a standardized project implemented in each framework by measuring key performance indicators such as Speed Index (initial load), response time, and FPS (frames per second).

## **IMPORTANT WARNING (PLEASE READ)**

**WARNING: This benchmark includes tests that involve fast-changing colors. If you have epilepsy or any other condition that could be triggered by rapidly flashing visuals, please proceed with caution or avoid running the tests.**

## Table of Contents

- [Overview](#overview)
- [Important Warning](#important-warning)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Benchmark Metrics](#benchmark-metrics)
  - [Speed Index (Initial Load)](#speed-index-initial-load)
  - [Response Time](#response-time)
  - [FPS (Frames Per Second)](#fps-frames-per-second)
- [Results](#results)
- [Contributing](#contributing)
- [License](#license)

## Project Structure

The repository is organized as follows:

```
frontend-benchmark/
│
├── nextjs-proj/
│   └── (Next.js project files)
├── nuxt-proj/
│   └── (Nuxt project files)
├── angular-proj/
│   └── (Angular project files)
├── svelte-proj/
│   └── (Svelte project files)
│
├── README.md
└── LICENSE
```

## Installation

To set up the projects and run the benchmarks, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/avi-2-avi/frontend-tdp-benchmark.git
   cd frontend-tdp-benchmark
   ```

2. Install dependencies for each project:
   ```bash
   cd nextjs-proj
   npm install
   cd ../nuxt-proj
   npm install
   cd ../angular-proj
   npm install
   cd ../svelte-proj
   npm install
   ```

## Usage

To run the benchmarks, navigate to each individual project and execute it. Make sure you have Node.js and npm installed on your machine.

1. Navigate to the project directory, for example:

   ```bash
   cd nextjs-proj
   ```

2. Run the benchmark:
   ```bash
   npm run dev
   ```

This will execute the tests for each framework and collect data on Speed Index, response time, and FPS.

## Benchmark Metrics

The benchmark focuses on three main metrics to evaluate performance:

### Speed Index (Initial Load)

Speed Index measures how quickly the contents of a page are visibly populated. Lower values indicate better performance.

### Response Time

Response time measures the time taken for the application to respond to user interactions. This metric is crucial for assessing the responsiveness of the application.

### FPS (Frames Per Second)

FPS measures the rendering performance during animations and user interactions. Higher FPS values indicate smoother performance.

## Results

Each framework's performance has been documented and compared, obtaining the following performance results, from most to least performant:

1. Svelte
2. Next.js
3. Nuxt
4. Angular

## Contributing

Contributions are welcome! If you would like to improve the benchmarks or add new features, please fork the repository and create a pull request.

## License

This project is licensed under the GNU License. See the [LICENSE](./LICENSE) file for details.
