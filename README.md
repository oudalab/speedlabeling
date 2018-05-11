# speedlabeling

Labeled data is important for machine learning, but hand-labeling a dataset can be time-consuming and prohibitively expensive. Being able to generate labeled data quickly and accurately is crucial to an effective, timely model. Application specifications might also change over time, requiring the training dataset to be changed. In such cases, we need to devise tools that can act as quickly as possible by generating the required training dataset. Our solution to this problem is speed labeling, a project designed to create labeled training data faster and smarter.

This project involves a suite of tools to help users efficiently annotate the data in question. The first part, the label preparation interface, enables users to input different kinds of data, processes the data, and suggests potential label classes. The user can then edit the suggested classes and set the final list.

The second part is a recommendation system. Here, suitable labeling algorithms are selected by the system for the specific type of input data. For example, images and video may be classified differently than textual data. Then the system is ready for the process of tagging.

The third part of the system, the generative model, deals with different inputs collected from crowdsourcing, existing knowledge bases, and weak supervision. The labels returned from these three sources are usually not accurate and may conflict with one another. The generative model learns the accuracies of the sources and makes use of the majority vote, weights assigned to the sources, and other factors to choose the right label.

Acquiring the large datasets needed by supervised learning is arguably the most challenging part of building artificial intelligence. By designing a system that utilizes the power of crowdsourcing and machine learning, we will be able to classify datasets cheaper, faster, and more accurately, leading to better learning models.

## A prototype trinary labeling interface
![A prototype two-class labeling interface](https://user-images.githubusercontent.com/13937307/39909002-5b393118-54b6-11e8-86e9-44ec74de95a1.gif)

## A prototype multi-class labeling interface
![A prototype multi-class labeling interface](https://user-images.githubusercontent.com/13937307/39909407-4b646e40-54b8-11e8-8ae1-f04f9ff382b5.gif)
