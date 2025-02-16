FROM maven:3.9.8-eclipse-temurin-21 AS builder
WORKDIR /build

COPY pom.xml ./pom.xml

COPY webapp/src ./webapp/src
COPY webapp/pom.xml ./webapp/pom.xml

COPY frontend ./frontend

RUN mvn clean package

FROM azul/zulu-openjdk-alpine:21-jre-headless-latest
WORKDIR /app

ARG DOCKER_USER=docker_user
RUN addgroup -S "$DOCKER_USER" && adduser -S "$DOCKER_USER" -G "$DOCKER_USER"

COPY --from=builder /build/webapp/target/webapp-*.war ./app.war
COPY --from=builder /build/webapp/src/main/resources/log4j2.yaml .

RUN chown "$DOCKER_USER":"$DOCKER_USER" .
USER $DOCKER_USER

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.war"]
