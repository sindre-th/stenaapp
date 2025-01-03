package no.stena.app.service;

import no.stena.app.api.dto.TestDto;
import no.stena.app.repository.TestRepository;
import no.stena.app.repository.entity.TestEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TestService {

    private final TestRepository testRepository;

    @Autowired
    public TestService(TestRepository testRepository) {
        this.testRepository = testRepository;
    }

    TestDto get(Long id) {
        return testRepository.findById(id).map(entity ->
                        new TestDto(entity.getId(), entity.getName(), entity.getAge()))
                .orElseThrow(() -> new IllegalStateException("Forventet objekt"));
    }

    TestDto opprett(TestDto testDto) {
        TestEntity testEntity = new TestEntity();
        testEntity.setAge(testEntity.getAge());
        testEntity.setName(testEntity.getName());
        return get(testRepository.save(testEntity).getId());
    }
}
