# Stage 1: Build the application using the Maven wrapper
FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app

COPY mvnw mvnw.cmd ./
COPY .mvn .mvn
COPY pom.xml .
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Stage 2: Run the application using Eclipse Temurin JRE
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

COPY --from=build /app/target/notes_service-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]